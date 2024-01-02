const recordService = require('../services/recordService')

const getRecordForWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req
  //   console.log(req)
  try {
    const record = recordService.getRecordForWorkout(workoutId)
    res.send({ status: 'OK', data: record })
    return record
  } catch (err) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getRecordForWorkout,
}
