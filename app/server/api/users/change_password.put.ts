
import { defineEventHandler, readBody } from 'h3'
import { User } from '../../dbModels'

interface IPasswordChangeRequestBody {
  currentPassword: string;
  newPassword: string;
}

export default defineEventHandler(async (event) => {
  console.log('*** PUT /api/users/change_password ***')
  const { currentPassword, newPassword } = await readBody<IPasswordChangeRequestBody>(event)
  const userId = event.context.user?.id

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not authenticated.'
    })
  }

  try {
    const user = await User.findById(userId)

    // Verify the current password
    const isPasswordValid = await user.verifyPasswordSync(currentPassword)
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Wrong password.'
      })
    }

    // Update the user's password with the new one
    user.password = newPassword
    await user.save()

    return {
      statusCode: 200,
      statusMessage: 'Password changed successfully.'
    }
  } catch (error) {
    console.error('Error changing password:', error)
    throw error
  }
})
