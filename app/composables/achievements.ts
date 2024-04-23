export const createAchievement = async (achievementData) => {
  const createdAchievement = await $fetch('/api/achievements/', {
    method: 'POST',
    body: {
      data: achievementData
    }
  })
  return createdAchievement
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
