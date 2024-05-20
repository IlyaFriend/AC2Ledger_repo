import { defineEventHandler } from 'h3'
import { User } from '../../dbModels'
import getUserUniversities from '~/server/utils/getUserUniversities'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** GET /api/users/${id} ***`)
  try {
    const user = await User.findById(id).select('-password').lean()
    if (!user) {
      console.log(`User with id ${id} not found.`)
      throw createError({
        statusCode: 404,
        statusMessage: 'User with given id was not found.'
      })
    }
    user.score = Number(user.score)?.toFixed(2)
    const userUniversities = await getUserUniversities(id)

    const result = { ...user, userUniversities }
    return result
  } catch (err) {
    console.log(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error when seacrhing user.'
    })
  }
})
