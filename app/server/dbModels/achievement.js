import mongoose from 'mongoose'
const { Schema } = mongoose

const SchemaMain = new Schema({
  title: {
    type: String,
    required: true
  },
  type: String,
  description: String,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    type: Date,
    default: () => Date.now()
  },
  details: {
    type: mongoose.Schema.Types.Mixed
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    immutable: true
  },
  scopus_id: String
})

export default SchemaMain
