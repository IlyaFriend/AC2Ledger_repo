import { createError, H3Event } from 'h3'
import { verify } from 'jsonwebtoken'
import { SECRET } from '~/server/api/auth/login.post'

const blacklist = ['/api/auth/', '/login'] // routes that need this middleware
const whitelist = ['/api/scopus/']

const ensureAuth = (event: H3Event) => {
  const tokenParts = event?.req?.headers?.cookie.split(';')

  let authToken, refreshToken
  tokenParts.forEach((part) => {
    const [key, value] = part.split('=')
    if (key.trim() === 'auth.token') {
      authToken = value
    } else if (key.trim() === 'auth.refresh-token') {
      refreshToken = value
    }
  })
  const authHeaderValue = authToken || refreshToken
  if (typeof authHeaderValue === 'undefined') {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Need to pass valid auth.refresh-token header to access this endpoint'
    })
  }

  try {
    return verify(authHeaderValue, SECRET)
  } catch (error) {
    console.error("Login failed. Here's the raw error:", error)
    throw createError({
      statusCode: 403,
      statusMessage: 'You must be logged in to use this endpoint'
    })
  }
}

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname

  if (blacklist.findIndex(item => url.startsWith(item)) >= 0) {
    return
  }

  if (event.method === 'GET' && whitelist.findIndex(item => url.startsWith(item)) < 0) {
    return
  }
  const user = ensureAuth(event)
  event.context.user = user
})
