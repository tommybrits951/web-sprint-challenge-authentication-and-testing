const db = require('../../data/dbConfig')

async function add(user) {
    const [id] = await db("users").insert(user)
    const newUser = getById(id)
    return newUser
}
async function getBy(filter) {
    const users = await db('users').where("username", filter).select(`*`)
    return users
}
function getById(id) {
    return db('users').where("id", id).first()
}

module.exports = {
    getById,
    add,
    getBy
}