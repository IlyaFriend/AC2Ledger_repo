import { defineEventHandler, readBody, createError } from 'h3'
import { User } from '../../dbModels'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const currentUser = event.context.user

  try {
    console.log(`*** PUT /api/users/${id} ***`)

    const user = await User.findById(id)

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'User not found.' })
    }

    // Check if the current user tries to update themselves
    if (currentUser && currentUser.id !== user._id.toString()) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this user.' })
    }

    const cleanData = { ...data }

    for (const key in cleanData) {
      if (cleanData[key] === undefined) {
        delete cleanData[key]
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, cleanData, { new: true })
    console.log('Updated user:', updatedUser)
    return updatedUser
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
})
