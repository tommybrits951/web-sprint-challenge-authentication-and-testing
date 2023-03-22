const Users = require('../jokes/jokes-model')



async function checkUsername(req, res, next) {
    try {
        const {username} = req.body;
        const users = await Users.getBy(username)
        if (users.length < 1) {
            next()
        } else {
            res.status(422).json({message: "username taken"})
        }
    } catch (error) {
        next(error)
    }
}
function checkCred(req, res, next) {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(422).json({message: "username and password required"})
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