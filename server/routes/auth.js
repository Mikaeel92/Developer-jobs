// in this file we want to do two thing
// one: login and create JWT token
// two: user register(sign up) and save that to users.json

//for create route
import express from 'express'
// read file and write on it
import fs from 'fs'
//for working with file direction
import path from 'path'
//for creating tokens
import jwt from 'jsonwebtoken'
//because we use es module we need it for __filename & __dirname
import { fileURLToPath } from 'url'

// route setting for working with "jobs.json" it's a fixed part, just memorise!
const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const userPath = path.join(__dirname, '../data/jobs.json')

//loging part
//create route for login, its a page, login means just check he is exist in database or not
router.post('/login', (req, res) => {
    //get username and password from request body. it came from front(reac!)
    const { username, password } = req.body
    //reading users.json as string
    const data = fs.readFileSync(userPath, 'utf-8')
    // turning string to javascript's array
    const users = JSON.parse(data)
    //comparin username and password to the users who signed up in app, in jobs.json or users.json file
    const user = users.find(user => user.username === username && user.password === password)
    // if the field was empty or not registered befor we are showing errors
    if(!user) {
        return res.status(401).json({error: 'username or password is wrong!'})
    }

    //if we found it in database with jsonwebtoken we will creat a JWT with id and role
    //overally it has three parts: 1-header(sign) 2-payload(id & role) 3-signature (secretkey)
    //we are using "sign" method from jsonwebtoken for creat a token and resault will save in "const token"
    const token = jwt.sign(
        //this section is called token playload for creat id and role and...
        {id: user.id, role: user.role},
        //token key, in real app it's in env file and just server must know it
        'secretkey',
        //token expired after any time we want
        { expiresIn: '1h' }
    )
    //return token for user as a json file it's in {} because we want to send it as object and id & role are objects
    res.json({ token })

})

// create route for register means sign up
router.post('/register', (req, res) => {
    //getting username and password from users request
    const {username, password, role} = req.body
    //if one of the fields was empty we are getting error!
    if(!username || !password || !role) {
        return res.status(400).json({ error: 'all fields are required' })
    }
    //reading file and spicifie it's existing or not! becoause we don't want the similar username!
    const users = JSON.parse(fs.readFileSync(userPath, 'utf-8'))
    const existingUser = users.find(u => u.username === username)
    if(existingUser) {
        return res.status(409).json({error: 'username already exists'})
    }
    //if everything was fine we will make a new acount. with simple id(timestamp) and pushing to users array
    const newUser = {
        id: Date.now().toString(),
        username,
        password,
        role
    }
    users.push(newUser)
    //add new array with this new account to database
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2))
    // sending successfull message
    res.status(201).json({message: 'user registered successfully'})
    
})

export default router