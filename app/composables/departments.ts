export const createDepartment = async (universityId: string, facultyId: string, departmentData: { name: string, administration: string[] }) => {
  const createdDepartment = await $fetch(`/api/universities/${universityId}/faculties/${facultyId}/departments/`, {
    method: 'POST',
    body: {
      data: departmentData
    }
  })
  return createdDepartment
}

export const updateDepartment = async (universityId: string, facultyId: string, departmentId: string, departmentData: any) => {
  const updatedDepartment = await $fetch(`/api/universities/${universityId}/faculties/${facultyId}/departments/${departmentId}`, {
    method: 'PUT',
    body: {
      data: departmentData
    }
  })
  return updatedDepartment
}

export const addTeachers = async (universityId: string, facultyId: string, departmentId: string, teachers: string[]) => {
  const newTeachers = await $fetch(`/api/universities/${universityId}/faculties/${facultyId}/departments/${departmentId}/update-teachers`, {
    method: 'PUT',
    body: {
      data: {
        teachers,
        action: 'add'
      }
    }
  })
  return newTeachers
}

export const deleteTeachers = async (universityId: string, facultyId: string, departmentId: string, teachers: string[]) => {
  const res = await $fetch(`/api/universities/${universityId}/faculties/${facultyId}/departments/${departmentId}/update-teachers`, {
    method: 'PUT',
    body: {
      data: {
        teachers,
        action: 'delete'
      }
    }
  })
  return res
}
