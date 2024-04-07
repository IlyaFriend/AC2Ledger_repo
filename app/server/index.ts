import mongoose from 'mongoose'

const mongoConnectionString = process.env.MONGO_CONNECTION_STRING
export default async () => {
  try {
    await mongoose.connect(mongoConnectionString)
    console.log('DB connection established.')
  } catch (err) {
    console.log('DB connection failed.', err)
  }
}
