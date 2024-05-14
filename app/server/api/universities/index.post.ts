import { defineEventHandler, readBody } from 'h3'
import { University } from '../../dbModels'

interface IRequestBody {
  data: any;
}
export default defineEventHandler(async (event) => {
  console.log('*** POST /api/universities/ ***')
  const { data } = await readBody<IRequestBody>(event)
  try {
    const newUniversity = await University.create(data)
    console.log('New university added:', newUniversity)
    return newUniversity
  } catch (err) {
    console.log(err)
    throw error
  }
})
