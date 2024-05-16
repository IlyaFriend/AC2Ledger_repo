import { University, Faculty, Department } from '~/server/dbModels'

export async function isInAdministration (userId: string, universityId?: string, facultyId?: string, departmentId?: string): Promise<boolean> {
  if (universityId) {
    const university = await University.findById(universityId)

    const isAdminOfUniversity = university && university?.administration?.includes(userId)
    if (isAdminOfUniversity) {
      return true
    }
  }

  if (facultyId) {
    const faculty = await Faculty.findById(facultyId)

    const isAdminOfFaculty = faculty && faculty?.administration?.includes(userId)
    if (isAdminOfFaculty) {
      return true
    }
  }

  if (departmentId) {
    const department = await Department.findById(departmentId)

    const isAdminOfDepartment = department && department?.administration?.includes(userId)
    if (isAdminOfDepartment) {
      return true
    }
  }

  return false
}
