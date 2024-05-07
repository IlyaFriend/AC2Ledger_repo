import { defineEventHandler } from 'h3'
import { User } from '../../dbModels'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/users/${id} ***`)
  try {
    const user = await User.findById(id).select('-password')
    if (!user) {
      console.log(`User with id ${id} not found.`)
      throw createError({
        statusCode: 404,
        statusMessage: 'User with given id was not found.'
      })
    }
    return user
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error when seacrhing user.'
    })
  }
})
