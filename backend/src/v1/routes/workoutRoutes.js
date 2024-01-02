const express = require('express')
const apicache = require('apicache')
const workoutController = require('../../controllers/workoutController')
const recordController = require('../../controllers/recordController')
const router = express.Router()
const cache = apicache.middleware

//? protected route
// for authenticated
// const authenticate = require("../../middlewares/authenticate");
// for 
// const authorize = require("../../middlewares/authorize");

/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Workout"
 *       5XX:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */
//! best practice use cache 针对特定point
router.get('/', cache('2 minutes'), workoutController.getAllWorkouts)

router.get('/:workoutId', workoutController.getOneWorkout)

router.post('/', workoutController.createNewWorkout)

router.patch('/:workoutId', workoutController.updateOneWorkout)

router.delete('/:workoutId', workoutController.deleteOneWorkout)

//? for record
router.get('/:workoutId/records', recordController.getRecordForWorkout)

module.exports = router
