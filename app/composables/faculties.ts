export const createFaculty = async (universityId: string, facultyData: { name: string, administration: string[] }) => {
  const createdFaculty = await $fetch('/api/faculties/', {
    method: 'POST',
    body: {
      data: {
        universityId,
        faculty: facultyData
      }
    }
  })
  return createdFaculty
}

export const updateFaculty = async (facultyId: string, facultyData: any) => {
  const updatedFaculty = await $fetch(`/api/faculties/${facultyId}`, {
    method: 'PUT',
    body: {
      data: facultyData
    }
  })
  return updatedFaculty
}
