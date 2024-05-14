import mongoose from 'mongoose'
const { Schema } = mongoose

const SchemaMain = new Schema({
  name: {
    type: String,
    required: true
  },
  shortName: String,
  city: String,
  address: String,
  postCode: String,
  administration: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  faculties: [{
    type: Schema.Types.ObjectId,
    ref: 'faculty'
  }]
})

export default SchemaMain
