import mongoose from 'mongoose'
const { Schema } = mongoose

const SchemaMain = new Schema({
  name: {
    type: String,
    required: true
  },
  administration: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  score: {
    type: Number,
    default: 0,
    immutable: true
  }
})

export default SchemaMain
