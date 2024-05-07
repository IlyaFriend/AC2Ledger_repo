import { createError, eventHandler, readBody } from 'h3'
import { sign, verify } from 'jsonwebtoken'
import { User } from '~/server/dbModels'

export const SECRET = 'dummy'

export default eventHandler(async (event) => {
  const body = await readBody<{ refreshToken: string }>(event)

  if (!body.refreshToken) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, no refreshToken in payload'
    })
  }

  const decoded = verify(body.refreshToken, SECRET)

  if (!decoded) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Unauthorized, refreshToken can`t be verified'
    })
  }

  const expiresIn = 60 * 5 // 5 minutes

  const userData = await User.findById(decoded.id)
  if (!userData) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found.'
    })
  }

  const user = {
    id: userData._id,
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    role: userData.role
  }

  const accessToken = sign({ ...user }, SECRET, {
    expiresIn
  })
  const refreshToken = sign({ ...user }, SECRET, {
    expiresIn: 60 * 60 * 24 * 100
  })

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})
