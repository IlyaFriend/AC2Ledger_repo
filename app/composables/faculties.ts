export const createFaculty = async (universityId: string, facultyData: { name: string, administration: string[] }) => {
  const createdFaculty = await $fetch(`/api/universities/${universityId}/faculties/`, {
    method: 'POST',
    body: {
      data: facultyData
    }
  })
  return createdFaculty
}

export const updateFaculty = async (universityId: string, facultyId: string, facultyData: any) => {
  const updatedFaculty = await $fetch(`/api/universities/${universityId}/faculties/${facultyId}`, {
    method: 'PUT',
    body: {
      data: facultyData
    }
  })
  return updatedFaculty
}
