exports = async function (changeEvent) {
  const achievementTypes = {
    Article: {
      category: 'Publications',
      score: 8
    },
    'Conference Paper': {
      category: 'Publications',
      score: 8
    },
    'Books or Book Chapters': {
      category: 'Publications',
      score: 9
    },
    'Technical Reports': {
      category: 'Publications',
      score: 5
    },

    'Conference Presentation': {
      category: 'Presentations',
      score: 4
    },
    'Invited Talk or Seminar': {
      category: 'Presentations',
      score: 3
    },

    'Supervision of Graduate or Undergraduate Students': {
      category: 'Supervision',
      score: 3
    },
    'Postdoctoral Supervision': {
      category: 'Supervision',
      score: 4
    },

    'Research Grant': {
      category: 'Grants and Funding',
      score: 9
    },
    Fellowship: {
      category: 'Grants and Funding',
      score: 7
    },
    Award: {
      category: 'Grants and Funding',
      score: 8
    },

    'Workshops Attended or Conducted': {
      category: 'Professional Development',
      score: 6
    },
    Certification: {
      category: 'Professional Development',
      score: 5
    },

    'Patents Filed or Granted': {
      category: 'Patents and Intellectual Property',
      score: 10
    },
    'Intellectual Property Contributions': {
      category: 'Patents and Intellectual Property',
      score: 10
    },

    'Editorial Board Memberships': {
      category: 'Editorial and Review Activities',
      score: 7
    },
    'Reviewing for Journals or Conferences': {
      category: 'Editorial and Review Activities',
      score: 6
    },

    'Outreach Activities': {
      category: 'Community Engagement',
      score: 2
    },
    'Public Lectures or Media Appearances': {
      category: 'Community Engagement',
      score: 3
    },

    'Academic Award': {
      category: 'Awards and Honors',
      score: 8
    },
    'Honorary Membership': {
      category: 'Awards and Honors',
      score: 4
    },

    'Developing of Software Tools': {
      category: 'Software and Tools',
      score: 9
    },
    'Contributed to Open-source Projects': {
      category: 'Software and Tools',
      score: 7
    },
    Other: {
      category: 'Other',
      score: 1
    }
  }

  // Get the MongoDB service
  const db = context.services.get('Cluster0')
  const scholarSphereDB = db.db('scholarSphere')
  const usersCollection = scholarSphereDB.collection('users')
  const departmentsCollection = scholarSphereDB.collection('departments')

  try {
    if (changeEvent.operationType === 'insert') {
      const achievement = changeEvent.fullDocument

      // Calculate the score to add based on the achievement type
      const scoreToAdd = achievementTypes[achievement.type]?.score || 0

      // Update the users' scores
      const userUpdates = achievement.users.map(async (userId) => {
        await usersCollection.updateOne(
          { _id: userId },
          { $inc: { score: scoreToAdd } }
        )
      })

      await Promise.all(userUpdates)

      if (achievement.department_id) {
        const department = await departmentsCollection.findOne({ _id: achievement.department_id })
        if (department) {
          await departmentsCollection.updateOne(
            { _id: achievement.department_id },
            { $inc: { score: scoreToAdd } }
          )
        }
      }
    } else if (changeEvent.operationType === 'update') {
      const oldAchievement = changeEvent.fullDocumentBeforeChange
      const newAchievement = changeEvent.fullDocument

      // Calculate the score difference
      const oldScore = achievementTypes[oldAchievement.type]?.score || 0
      const newScore = achievementTypes[newAchievement.type]?.score || 0
      const scoreDifference = oldScore - newScore

      let requests = []
      // Update the users' scores that are in newAchievement but not in oldAchievement
      const addUserUpdates = newAchievement.users.map(user => user.toString())
        .filter(userId => !oldAchievement.users.map(user => user.toString()).includes(userId))
        .map(async (userId) => {
          await usersCollection.updateOne(
            { _id: new BSON.ObjectId(userId) },
            { $inc: { score: newScore } }
          )
        })
      // Update the users' scores that are in oldAchievement but not in newAchievement
      const removeUserUpdates = oldAchievement.users.map(user => user.toString())
        .filter(userId => !newAchievement.users.map(user => user.toString()).includes(userId))
        .map(async (userId) => {
          await usersCollection.updateOne(
            { _id: new BSON.ObjectId(userId) },
            { $inc: { score: -oldScore } }
          )
        })
      requests = [...addUserUpdates, ...removeUserUpdates]

      if (oldAchievement.type !== newAchievement.type) {
        // Update the users' scores
        const userUpdates = newAchievement.users.map(user => user.toString())
          .filter(userId => newAchievement.users.map(user => user.toString()).includes(userId) && oldAchievement.users.map(user => user.toString()).includes(userId))
          .map(async (userId) => {
            await usersCollection.updateOne(
              { _id: new BSON.ObjectId(userId) },
              { $inc: { score: -scoreDifference } }
            )
          })
        requests = requests.concat(userUpdates)

        if (newAchievement.department_id) {
          await departmentsCollection.updateOne(
            { _id: new BSON.ObjectId(newAchievement.department_id) },
            { $inc: { score: -scoreDifference } }
          )
        }
      }
      await Promise.all(requests)
    } else if (changeEvent.operationType === 'delete') {
      const deletedAchievement = changeEvent.fullDocumentBeforeChange

      // Calculate the score to subtract based on the achievement type
      const scoreToSubtract = achievementTypes[deletedAchievement.type]?.score || 0

      // Update the users' scores
      const userUpdates = deletedAchievement.users.map(async (userId) => {
        await usersCollection.updateOne(
          { _id: userId },
          { $inc: { score: -scoreToSubtract } }
        )
      })
      await Promise.all(userUpdates)
      if (deletedAchievement.department_id) {
        const department = await departmentsCollection.findOne({ _id: deletedAchievement.department_id })
        if (department) {
          await departmentsCollection.updateOne(
            { _id: deletedAchievement.department_id },
            { $inc: { score: -scoreToSubtract } }
          )
        }
      }
    }
  } catch (err) {
    console.error("Error updating users' scores:", err.message)
  }
}
