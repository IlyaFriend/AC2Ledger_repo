import { defineEventHandler, readBody, createError } from 'h3'
import { University } from '../../dbModels'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const user = event.context.user

  try {
    console.log(`*** PUT /api/universities/${id} ***`)

    const university = await University.findById(id)

    if (!university) {
      throw createError({ statusCode: 404, statusMessage: 'University not found.' })
    }

    // Check if the current user is included in the users of the university
    if (user && !university?.administration?.includes(user.id)) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this university.' })
    }

    const updatedUniversity = await University.findByIdAndUpdate(id, data, { new: true })
    console.log('Updated university:', updatedUniversity)
    return updatedUniversity
  } catch (error) {
    console.error('Error updating university:', error)
    throw error
  }
})
