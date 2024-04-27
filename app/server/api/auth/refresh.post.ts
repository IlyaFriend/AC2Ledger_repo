import { createError, eventHandler, readBody } from 'h3'
import { sign, verify } from 'jsonwebtoken'

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

  const user = {
    id: decoded.id,
    username: decoded.username,
    firstName: decoded.firstName,
    lastName: decoded.lastName,
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
