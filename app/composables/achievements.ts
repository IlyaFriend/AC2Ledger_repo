export const createAchievement = async (achievementData) => {
  const createdAchievement = await $fetch('/api/achievements/', {
    method: 'POST',
    body: {
      data: achievementData
    }
  })
  return createdAchievement
}

export const updateAchievement = async (achievementId: string, achievementData: any) => {
  const updatedAchievement = await $fetch(`/api/achievements/${achievementId}`, {
    method: 'PUT',
    body: {
      data: achievementData
    }
  })
  return updatedAchievement
}

export const deleteAchievement = async (achievementId: string) => {
  if (!achievementId) {
    return
  }
  const deletedAchievement = await $fetch(`/api/achievements/${achievementId}`, {
    method: 'DELETE'
  })
  return deletedAchievement
}

export const removeAchievementAuthor = async (achievementId: string, userId: string) => {
  try {
    const response = await $fetch('/api/achievements/remove_author/', {
      method: 'PUT',
      query: {
        achievementId,
        userId
      }
    })
    return response
  } catch (error) {
    console.error('Error removing achievement author:', error)
    throw new Error('Failed to remove achievement author.')
  }
}
