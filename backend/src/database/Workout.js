const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = filterParams => {
  let workouts = DB.workouts
  try {
    return workouts.filter(workout => workout.mode.toLowerCase().includes(filterParams.mode))
  } catch (error) {
    throw { status: 500, message: error }
  }
}

const getOneWorkout = workoutId => {
  try {
    const workout = DB.workouts.find(workout => workout.id === workoutId)
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }
    return workout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const createNewWorkout = newWorkout => {
  try {
    const isAlreadyAdded = DB.workouts.findIndex(workout => workout.name === newWorkout.name) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      }
    }
    DB.workouts.push(newWorkout)
    saveToDatabase(DB)
    return newWorkout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const updateOneWorkout = (workoutId, changes) => {
  // It's database layer, DB operation maybe happend error we can't controll
  //! best practices: use Try catch to throw the errow to help api users or developers to find error
  try {
    const isAlreadyAdded = DB.workouts.findIndex(workout => workout.name === changes.name) > -1
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      }
    }
    const indexForUpdate = DB.workouts.findIndex(workout => workout.id === workoutId)
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }
    //! best practices object use ... spread to replace assign it's shallow copy
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString(),
    }
    DB.workouts[indexForUpdate] = updatedWorkout
    saveToDatabase(DB)
    return updatedWorkout
  } catch (error) {
    //! best practices throw status code and message info
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const deleteOneWorkout = workoutId => {
  try {
    const indexForDeletion = DB.workouts.findIndex(workout => workout.id === workoutId)
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      }
    }
    DB.workouts.splice(indexForDeletion, 1)
    saveToDatabase(DB)
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
}
