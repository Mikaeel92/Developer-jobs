//we need this file for checking the token is valid or not
//because in auth.js we just checket register and login and create token
// but if anybody can open /dashboard or any pages without having token
//in this part we should check three things
// 1- token is rewrite(dastkari shode) 2- if the date is pased!(monghazi) 3- if the information is trustfull
// in the other case the user could access to every route without validation

// we need to check token so we need jwt from jsonwebtoken(J w t)
import jwt from 'jsonwebtoken'

//create s middleware and it always has three parameter req, res, next
function authMiddleware(req, res, next) {
    //get token from header of request, and the format usually is like: Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization;
    // if authHeader not exist or it didn't start with Bearer => error
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'No token providded' })
    }
    // in another case we get token with white space, and it's be like ['Bearer', 'afdvsfv23']
    // [1] => get token code => afdvsfv23
    const token = authHeader.split(' ')[1]

    //now with try catch we will verify token
    try {
        //verify came with jwt library for verifying and check thesign(secret key)
        //and verify method will do twoc thing => 1- check sign and token , 2- pul out the id, role and ... from req.user
        const decoded = jwt.verify(token, 'secretkey')
        //adding users informamation to req
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
}

export default authMiddleware

//now we can use it in each file like:
// router.get('/dashboard' , authMiddleware (req, res) => ....})