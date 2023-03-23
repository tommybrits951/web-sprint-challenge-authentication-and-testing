const Users = require('../jokes/jokes-model')
const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../middleware/config/config')//eslint-disable-line
const {check, checkUsername, checkCred} = require('./auth-middlware')


router.post('/register',check, checkUsername, async (req, res) => {
  try {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8) 
    user.password = hash
    const newUser = await Users.add({username: user.username, password: user.password})
    res.status(200).json(newUser)
  } catch (err) {
    res.status(401).json({message: 'username and password required'})
  }
}
)
  

  
  
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
router.post('/login',check, checkCred, async (req, res) => {
  try {
        const {username, password} = req.body;
        const user = await Users.getBy(username)
     if (user && bcrypt.compareSync(password, user.password)) {
       const token = buildToken(user)
       res.status(200).json({message: `welcome, ${username}`, token: token, })
      } else {
        res.status(401).json({message: "invalid credentials"})
        }
  } catch (err) {
    res.status(401).json({message: err.message ||'invalid credentials'})
  }
  
  
  
  
  
  
  
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});


function buildToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  const options = {
    expiresIn: "1d"
  }
  return jwt.sign(payload, 'shh', options) 
}

router.use((error, req, res, next) => {//eslint-disable-line
  res.status(500).json({message: error.message || "something went wrong"})
})



module.exports = router;
