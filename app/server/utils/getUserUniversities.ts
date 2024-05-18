import { University, Faculty, Department } from '~/server/dbModels'

export default async function getUserUniversities (userId: string): Promise<string[]> {
  const universitiesQuery = University.find({ administration: { $in: [userId] } }).select('_id faculties name shortName')
  const facultiesQuery = Faculty.find({ administration: { $in: [userId] } }).select('_id departments name')
  const departmentsQuery = Department.find({
    $or: [
      { administration: { $in: [userId] } },
      { teachers: { $in: [userId] } }
    ]
  }).select('_id teachers administration name')

  let [universitiesResults, facultiesResults, departmentsResults] = await Promise.all([universitiesQuery, facultiesQuery, departmentsQuery])

  if (facultiesResults.length > 0) {
    departmentsResults = departmentsResults.filter((department) => {
      for (const faculty of facultiesResults) {
        if (faculty?.departments?.includes(department._id)) {
          return false
        }
      }
      return true
    })
  }

  if (universitiesResults.length > 0) {
    facultiesResults = facultiesResults.filter((faculty) => {
      for (const university of universitiesResults) {
        if (university?.faculties?.includes(faculty._id)) {
          return false
        }
      }
      return true
    })
  }

  if (departmentsResults.length > 0) {
    const facultiesResults2 = await Faculty.find({ departments: { $in: departmentsResults.map(department => department._id) } })
    facultiesResults = [...facultiesResults, ...facultiesResults2]
  }

  const universities = await University.find({ faculties: { $in: facultiesResults.map(faculty => faculty._id) } })
  return universities.concat(universitiesResults)
}
