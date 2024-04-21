import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'

const { Schema } = mongoose

const SchemaMain = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, bcrypt: true, required: true },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  patronymic: String,
  courses: [String],
  externalProfiles: Object
})

SchemaMain.methods.verifyPasswordSync = function (password) {
  return bcrypt.compareSync(password, this.password)
}

SchemaMain.virtual('fullName').get(() => {
  return `${this.lastName} ${this.firstName} ${this.patronymic || ''}`.trim()
})

SchemaMain.plugin(bcrypt)

export default SchemaMain
