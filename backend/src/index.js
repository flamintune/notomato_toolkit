const express = require('express')
const apicache = require('apicache')
const v1WorkoutRouter = require('./v1/routes/workoutRoutes.js')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const cache = apicache.middleware
const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");
// for client data res data  res body => json
// app.use(cache('2 minutes'))
app.use(bodyParser.json())
app.use('/api/v1/workouts', v1WorkoutRouter)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
  V1SwaggerDocs(app, PORT);
})

