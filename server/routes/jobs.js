import express from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import authMiddleware from '../middleware/authMiddleware'
import checkRole from '../middleware/roleMiddleware'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dataPath = path.join(__dirname, '../data/jobs.json')

//get all jobs
router.get('/', (req, res) => {
    const data = fs.readFileSync(dataPath, 'utf-8')
    const jobs = JSON.parse(data)
    res.json(jobs)
})

//get a single job
router.get('/:id', (req, res) => {
    const jobId = req.params.id

    const data = fs.readFileSync(dataPath, 'utf-8')
    const jobs = JSON.parse(data)

    const job = jobs.find(job => job.id === jobId)
    if(!job) {
       return res.status(404).json({error: 'Job not found'})
    }
    res.json(job)
})

//add job
router.post('/', authMiddleware, checkRole(['admin']), (req, res) => {
    const { title, type, description, location, salary, company } = req.body

if (!title || !type || !description || !location || !salary || !company) {
        return res.status(400).json({error: 'You have to complete all the fields!'})
    }

    const data = fs.readFileSync(dataPath, 'utf-8')
    const jobs = JSON.parse(data)
    
    const newId = Date.now().toString()

    const newJob = {
        id: newId,
        title,
        type, 
        description,
        location,
        salary,
        company
    }
    jobs.push(newJob)

    fs.writeFileSync(dataPath, JSON.stringify(jobs, null, 2))
    res.status(201).json({ message: 'Job added successfully', job: newJob });
})

//delete job
router.delete('/:id',authMiddleware, checkRole(['admin']), (req, res) => {
    const jobId = req.params.id
    
    const data = fs.readFileSync(dataPath, 'utf-8')
    const jobs = JSON.parse(data)
    const jobIndex = jobs.findIndex(job => job.id === jobId)
    if(jobIndex === -1) {
      return res.status(404).json({error: 'Job not found'})
    }
    const deleteJob = jobs.splice(jobIndex, 1)[0]
    fs.writeFileSync(dataPath, JSON.stringify(jobs, null, 2))

    res.json({message: 'job deleted successfully', job: deleteJob})
})

//udpate a job 
router.put('/:id', authMiddleware, checkRole(['admine']) ,(req, res) => {
    const jobId = req.params.id
    const { title, type, description, location, salary, company } = req.body

    const data = fs.readFileSync(dataPath, 'utf-8')
    const jobs = JSON.parse(data)
    const jobIndex = jobs.findIndex(job => job.id === jobId)
    if(jobIndex ===  -1) {
    return res.status(404).json({error: 'Job not found'})
    }

    const updatedJob = {
        id: jobId,
        title,
        type, 
        description,
        location,
        salary,
        company
    }
    jobs[jobIndex] = updatedJob
    fs.writeFileSync(dataPath, JSON.stringify(jobs, null, 2))
    res.json({ message: 'Job updated successfully', job: updatedJob });

})


export default router