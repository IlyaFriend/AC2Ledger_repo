import { defineEventHandler, readBody } from 'h3'
import { Achievement } from '../../dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  console.log(`*** PUT /api/achievements/${id} ***`)
  const { data } = await readBody<IRequestBody>(event)
  try {
    const updatedAchievement = await Achievement.findByIdAndUpdate(id, data, { new: true })
    console.log('updated achivement:', updatedAchievement, '\n')
    return updatedAchievement
    // return null
  } catch (err) {
    console.dir(err)
    event.res.statusCode = 500
    return {
      code: 'ERROR',
      message: 'Something wrong.'
    }
  }
})
