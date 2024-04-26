export const searchUser = async (searchParams) => {
  try {
    const filteredSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([_, value]) => value)
    )

    const url = `/api/users/search?${new URLSearchParams(filteredSearchParams)}`

    const response = await $fetch(url)

    return response
  } catch (error) {
    console.error('Error searching for user:', error)
    throw error
  }
}
