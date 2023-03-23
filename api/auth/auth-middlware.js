const Users = require('../jokes/jokes-model')

async function checkUsername(req, res, next) {
    try {
        const {username, password} = req.body
        const users = await Users.getBy(username)
        if (users) {
            res.status(401).json({message: "username taken"})
        } else if (!req.body.username || !password) {
            res.status(401).json({message: 'username and password required'})
        } else {
            next()
        }
    } catch (err) {
        res.status(401).json({message: 'username taken'})
    }
}
function check(req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.status(401).json({message: 'username and password required'})

    } else {
        next()
    }
}

async function checkCred(req, res, next) {
    try {
        const {username, password} = req.body
        const user = await Users.getBy(username)
            req.username = username
            req.password = password
            req.user = user
            next()
        
       
    } catch (err) {
        res.status(401).json({message: 'err.message'})
    }
}

module.exports = {
    checkUsername,
    checkCred,
    check
}