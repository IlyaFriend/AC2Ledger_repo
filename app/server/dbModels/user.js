import mongoose from 'mongoose'
import bcrypt from 'mongoose-bcrypt'

const { Schema } = mongoose

const SchemaMain = new Schema({
  role: {
    type: String,
    enum: ['user', 'admin'],
    required: true,
    default: 'user',
    immutable: true
  },
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
  scopus_id: String,
  externalProfiles: Object,
  score: {
    type: Number,
    default: 0,
    immutable: true
  },
  publicKey: String,
})

SchemaMain.methods.verifyPasswordSync = function (password) {
  return bcrypt.compareSync(password, this.password)
}

SchemaMain.virtual('fullName').get(() => {
  return `${this.lastName} ${this.firstName} ${this.patronymic || ''}`.trim()
})

SchemaMain.plugin(bcrypt)

export default SchemaMain
