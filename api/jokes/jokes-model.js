const db = require('../../data/dbConfig')

async function add(user) {
    const [id] = await db("users").insert(user)
    const newUser = getById(id)
    return newUser
}

function getById(id) {
    return db('users').where("id", id).first()
}

module.exports = {
    getById,
    add
}