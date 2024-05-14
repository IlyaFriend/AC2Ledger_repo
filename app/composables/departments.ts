export const createDepartment = async (facultyId: string, departmentData: { name: string, administration: string[] }) => {
  const createdDepartment = await $fetch('/api/departments/', {
    method: 'POST',
    body: {
      data: {
        facultyId,
        department: departmentData
      }
    }
  })
  return createdDepartment
}

export const updateDepartment = async (departmentId: string, departmentData: any) => {
  const updatedDepartment = await $fetch(`/api/departments/${departmentId}`, {
    method: 'PUT',
    body: {
      data: departmentData
    }
  })
  return updatedDepartment
}
