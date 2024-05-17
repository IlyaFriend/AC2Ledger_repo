import { University, Faculty, Department } from '~/server/dbModels'

export default async function (userId: string): Promise<{ universities: typeof University[], faculties: typeof Faculty[] }> {
  // Find universities where the user is in administration
  const universities = (await University.find({ administration: { $in: [userId] } }).select('_id'))?.map(doc => doc?._id.toString())

  const faculties = (await Faculty.find({ administration: { $in: [userId] } }).select('_id'))?.map(doc => doc?._id.toString())

  const departmentsResults = await Department.find({
    $or: [
      { administration: { $in: [userId] } },
      { teachers: { $in: [userId] } }
    ]
  }).select('_id teachers administration')

  const departments = departmentsResults
    .filter(dep => dep?.administration.includes(userId))
    .map(dep => dep?._id.toString())

  const teacherDepartments = departmentsResults
    .filter(dep => dep?.teachers.includes(userId))
    .map(dep => dep?._id.toString())

  return { universities, faculties, departments, teacherDepartments }
}
