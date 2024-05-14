import mongoose from 'mongoose'
const { Schema } = mongoose

const SchemaMain = new Schema({
  name: {
    type: String,
    required: true
  },
  admins: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  departments: [{
    type: Schema.Types.ObjectId,
    ref: 'department'
  }]
})

export default SchemaMain
