// Root file for combining and exporting all the models
import { model } from 'mongoose'

import UserSchema from './user'
import AchievementSchema from './achievement'
// import DepartmentSchema from './department'
// import FacultySchema from './faculty'
// import UniversitySchema from './university'

export const User = model('users', UserSchema)
export const Achievement = model('achievement', AchievementSchema)
// export const Department = model('department', DepartmentSchema)
// export const Faculty = model('faculty', FacultySchema)
// export const University = model('university', UniversitySchema)
