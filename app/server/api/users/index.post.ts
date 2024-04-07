import { defineEventHandler, readBody } from 'h3'
import { User } from '../../dbModels'

interface IRequestBody {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/users/ ***')
  const { username, password, firstName, lastName } = await readBody<IRequestBody>(event)
  try {
    const userData = await User.findOne({
      username
    })
    if (userData) {
      console.log(`User with username ${username} already exists`)
      event.res.statusCode = 409
      return {
        code: 'USER_EXISTS',
        message: 'User with given username already exists.'
      }
    } else {
      const newUserData = await User.create({
        username,
        password,
        firstName,
        lastName
      })
      return {
        id: newUserData._id,
        name: newUserData.name
      }
    }
  } catch (err) {
    console.dir(err)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong.'
    }
  }
})
