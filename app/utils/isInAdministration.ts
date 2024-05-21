export default function (user: any, entityIds: string[] | string): boolean {
  if (!user) {
    return false
  }
  if (user.role === 'admin') {
    return true
  }

  const userEntityIds = [...user.universities, ...user.faculties, ...user.departments]

  const hasAccess = (id: string) => userEntityIds.includes(id)

  if (typeof entityIds === 'string') {
    return hasAccess(entityIds)
  } else if (Array.isArray(entityIds)) {
    return entityIds.some(id => hasAccess(id))
  }

  return false
}
