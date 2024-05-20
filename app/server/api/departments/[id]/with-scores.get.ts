import { defineEventHandler } from 'h3'
import { Achievement, Department } from '~/server/dbModels'

interface TeacherAchievements {
  [teacherId: string]: {
    totalScore: number;
  };
}

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const department = await Department.findById(id).select('teachers')
    // Fetch achievements for the specified department
    const achievements = await Achievement.find({ department_id: id })

    // Initialize the object to store teacher achievements
    const teacherScores: TeacherAchievements = {}

    // Summarize achievements for each teacher
    achievements.forEach((achievement) => {
      achievement.users.forEach((userId) => {
        if (department.teachers.includes(userId)) {
          if (!teacherScores[userId]) {
            teacherScores[userId] = 0
          }

          teacherScores[userId] += achievement.score.toFixed(2)
        }
      })
    })

    return { teacherScores, achievements }
  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error when seacrhing achievements.'
    })
  }
})
