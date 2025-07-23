// creating a function that get roles as argument and check it allowed to enter or not
//for example isAdmin o notAdmin!
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        //checked its allowerd or not
        //if it's not return an error, status 403 => forbidden!
        // req.user.role coming from req.body = decoded
        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' })
        }
        //if it's allowed ok keep going
        next()
    }
}
export default checkRole

//this page will used after authMiddleware it means if user logged in at first and then we could checked the role

