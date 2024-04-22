export const createAchievement = async (achievementData) => {
  const createdAchievement = await $fetch('/api/achievements/', {
    method: 'POST',
    body: {
      data: achievementData
    }
  })
  return createdAchievement
}
