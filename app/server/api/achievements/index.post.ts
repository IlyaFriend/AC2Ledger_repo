import { defineEventHandler, readBody } from 'h3'
import { Achievement } from '../../dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/achievements/ ***')
  const { data } = await readBody<IRequestBody>(event)
  try {
    const newAchievement = await Achievement.create(data)
    console.log('new achivement added:', newAchievement)
    return newAchievement
  } catch (err) {
    console.dir(err)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong.'
    }
  }
})
