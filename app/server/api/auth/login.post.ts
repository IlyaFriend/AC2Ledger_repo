import { createError, eventHandler, readBody } from 'h3'
import { sign } from 'jsonwebtoken'
import { User } from '~/server/dbModels'

interface IRequestBody {
  username: string;
  password: string;
}

export const SECRET = 'dummy'

export default eventHandler(async (event) => {
  const { username, password } = await readBody<IRequestBody>(event)
  const userData = await User.findOne({ username })
  if (!userData) {
    throw createError({
      statusCode: 403,
      statusMessage: 'User not found.'
    })
  }
  const isPasswordValid = await userData.verifyPasswordSync(password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Wrong password.'
    })
  }

  const user = {
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    // fullName: userData.fullName
  }

  const accessToken = sign({ ...user }, SECRET, {
    expiresIn: 15
  })
  const refreshToken = sign({ ...user }, SECRET, {
    expiresIn: 60 * 60 * 24
  })

  return {
    token: {
      accessToken,
      refreshToken
    }
  }
})
