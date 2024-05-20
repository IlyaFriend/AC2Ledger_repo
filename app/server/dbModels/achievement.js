import mongoose from 'mongoose'
import { achievementTypeNames } from '~/server/utils/achievementTypes'
const { Schema } = mongoose

const SchemaMain = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: achievementTypeNames,
    required: true,
    default: achievementTypeNames[achievementTypeNames.length - 1]
  },
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
  scopus_id: String,
  department_id: String,
  year: {
    type: Number,
    required: true,
    default: () => new Date().getFullYear()
  },
  score: {
    type: Number,
    default: 0,
    immutable: true
  }
})

export default SchemaMain
