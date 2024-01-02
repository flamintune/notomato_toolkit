const DB = require('./db.json')

// todo 查看出对应workoutId的record
const getRecordForWorkout = workoutId => {
  try {
    const record = DB.records.filter(record => record.workout === workoutId)
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout wih the id '${workoutId}'`,
      }
    }
    return record
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = { getRecordForWorkout }
