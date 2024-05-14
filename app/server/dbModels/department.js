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
  }]
})

export default SchemaMain
