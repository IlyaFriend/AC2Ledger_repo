import type { University } from '~/server/dbModels'

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

export const searchUniversitiesByIds = async (values: Array<any>): Promise<typeof University[]> => {
  if (!values) {
    return []
  }
  try {
    const url = `/api/universities/search/many-by-ids?${new URLSearchParams({ ids: JSON.stringify(values) })}`

    const response = await $fetch(url)

    return response
  } catch (error) {
    console.error('Error searching for universities:', error)
    throw error
  }
}
