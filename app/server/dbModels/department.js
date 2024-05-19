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
    validate: {
      validator: function (v) {
        return v >= 0
      },
      message: props => `${props.value} must be a non-negative number!`
    }
  }
})

export default SchemaMain
