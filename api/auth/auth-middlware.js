const Users = require('../jokes/jokes-model')
const bcrypt = require('bcryptjs')
async function checkUsername(req, res, next) {
    try {
        const {username, password} = req.body
        const users = await Users.getBy(username)
        if (users) {
            res.status(401).json({message: "username taken"})
        } else if (!username || !password) {
            
            res.status(401).json({message: 'username and password required'})
        } else {
            next()
        }
    } catch (err) {
        res.status(401).json({message: 'username taken'})
    }
}


async function checkCred(req, res, next) {
    try {
        const {username, password} = req.body
        const user = await Users.getBy(username)
        if (!user) {
            res.status(401).json({message: 'invalid credentials'})
        } else if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({message: 'invalid credentials'})
        } else {
            req.username = username
            req.password = password
            next()
        }
       
    } catch (err) {
        res.status(401).json({message: err.message})
    }
}

module.exports = {
    checkUsername,
    checkCred
}