const e = require('express');
const Users = require('../jokes/jokes-model')



async function checkUsername(req, res, next) {
    try {
        const {username} = req.body;
        const users = await Users.getBy(username)
        if (!users) {
            next()
        } else {
            res.status(422).json({message: "username taken"})
        }
    } catch (error) {
        next(error)
    }
}
async function checkCred(req, res, next) {
    const {username, password} = req.body;
    const user = await Users.getBy(username)

    if (username === undefined || password === undefined ) {
       next({status: 401, message: "username and password required"})
    } else if (user) {
        res.status(401).json({message: "invalid credentials"})
    } else {
        req.username = username
        req.password = password
        next()
    }
}




module.exports = {
checkUsername,
checkCred
}