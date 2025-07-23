import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import jobs from './routes/jobs'
import auth from './routes/auth'
import notFound from './middleware/notFound'
import errorHandler from './middleware/errorHandler'
import dashboardRoute from './routes/dashboard.js'
import admine from './routes/admine.js'
import { json } from 'stream/consumers'
import dotenv from 'dotenv'


//running the express library for creating the server
const app = express()

//for reading env file
dotenv.config()
const port = process.env.PORT || 8000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//it's saying we can read all requests that are in json format
//and its nesesari for put and post requests
app.use(express.json())

//these are the routes for example if we had a request to /dashboard its gonna go to this route
//its similar to making components in react
app.use('/api', auth)
app.use('api/jobs', jobs)
app.use('/api/dashboard', dashboardRoute)
app.use('/admine', admine)

//middlewares for error handling
//if route not find
app.use(notFound)

//if er have internal error in app
app.use(errorHandler)

//this line will show us server is running in which port
app.listen(port)