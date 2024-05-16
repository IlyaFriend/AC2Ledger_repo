import { defineEventHandler, readBody, createError } from 'h3'
import { Faculty } from '~/server/dbModels'
import { isInAdministration } from '~/server/utils/checkAdministration'

interface IRequestBody {
  data: any;
}

export default defineEventHandler(async (event) => {
  const { universityId, facultyId } = event.context.params
  const { data } = await readBody<IRequestBody>(event)
  const user = event.context.user

  console.log(`*** PUT /api/universities/${universityId}/faculty/${facultyId} ***`)

  if (user && !await isInAdministration(user.id, universityId, facultyId) && !event.context.isAdmin) {
    throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this faculty.' })
  }

  try {
    const faculty = await Faculty.findById(facultyId)

    if (!faculty) {
      throw createError({ statusCode: 404, statusMessage: 'Faculty not found.' })
    }

    // Check if the current user is included in the users of the faculty
    if (user && !await isInAdministration(user.id, universityId, facultyId)) {
      throw createError({ statusCode: 403, statusMessage: 'You do not have permission to update this faculty.' })
    }

    const updatedFaculty = await Faculty.findByIdAndUpdate(facultyId, data, { new: true })
    console.log('Updated faculty:', updatedFaculty)
    return updatedFaculty
  } catch (error) {
    console.error('Error updating faculty:', error)
    throw error
  }
})
