import { Achievement } from '~/server/dbModels'
import { keys as nonPublicKeys } from '~/utils/nonPublicKeys'

export function flattenDetails (achievement: typeof Achievement) {
  const { details, ...rest } = achievement
  const achievementData = {
    ...rest,
    ...details
  }
  return achievementData
}

export function filterNonPublicKeys (achievement: typeof Achievement) {
  const keys = Object.keys(achievement)
  const publicKeys = keys.filter(key => !nonPublicKeys.includes(key))
  const filteredAchievement: Record<string, any> = {}

  publicKeys.forEach((key) => {
    filteredAchievement[key] = achievement[key]
  })

  return filteredAchievement
}
