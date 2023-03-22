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





module.exports = {
checkUsername
}