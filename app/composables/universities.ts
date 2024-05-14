export const createUniversity = async (universityData) => {
  const createdUniversity = await $fetch('/api/universities/', {
    method: 'POST',
    body: {
      data: universityData
    }
  })
  return createdUniversity
}

export const updateUniversity = async (universityId: string, universityData: any) => {
  const updatedUniversity = await $fetch(`/api/universities/${universityId}`, {
    method: 'PUT',
    body: {
      data: universityData
    }
  })
  return updatedUniversity
}
