import { User } from '../dbModels'

const activeMiddlewarePaths = [
  {
    path: '/api/achievements/',
    method: 'DELETE'
  },
  {
    path: '/api/achievements/',
    method: 'POST'
  },
  {
    path: '/api/achievements/',
    method: 'PUT'
  }
]

const isAdmin = async (userFromContext: any) => {
  const user = await User.findById(userFromContext.id).select('role')
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'error checking role: user not found.'
    })
  }
  return user?.role === 'admin'
}

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return
  }

  const url = getRequestURL(event).pathname
  if (activeMiddlewarePaths.findIndex(item => event.method === item.method && url.startsWith(item.path)) < 0) {
    return
  }
  event.context.isAdmin = await isAdmin(event.context.user)
})
