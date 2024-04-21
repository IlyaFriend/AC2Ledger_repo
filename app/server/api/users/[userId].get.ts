import { defineEventHandler } from 'h3'
import { User } from '../../dbModels'

export default defineEventHandler(async (event) => {
  console.log('*** GET /api/users/ ***')
  const { userId } = event.context.params
  try {
    const user = await User.findById(userId).select('-password')
    console.log('user', user)
    if (!user) {
      console.log(`User with id ${userId} not found.`)
      event.res.statusCode = 404
      return {
        code: 'USER_NOT_FOUND',
        message: 'User with given id was not found.'
      }
    }
    return user
  } catch (err) {
    console.dir(err)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong.'
    }
  }
})
