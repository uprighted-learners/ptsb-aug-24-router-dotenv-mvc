// 1. import express router
const router = require("express").Router()
// ? [Step 4]
// Import our model to use it to connect between db and the client
const User = require("../models/user")


// 2. Perform your endpoint handling. Router gives access to all HTTP methods
router.post("/register", async (req, res) => {
    try {
        // Object destructuring our body
        const { fullName, age, email, password } = req.body

        if (!fullName || !age || !email || !password) {
            throw new Error(`Please provide full name, age, email, and password`)
        }
        // Create a new instance of model
        const newUser = new User({ fullName, age, email, password })
        // Save our model to the db
        await newUser.save()
    
        // returns response with a result
        res.status(201).json({
            message: `User created`,
            newUser
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
})

router.post("/login", (req, res) => {
    // TODO: try your shot at reading your database and returning its contents to the client
    // get request email and password values
    // read the databse
    // check if they match with db entries
    // check if they exist
    // check if password matches
    // send login response
    // wrap it in try catch and send different errors as responses

    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new Error(`Please provide email & password`)
        }

        const allUsers = read(users)

        const foundUser = allUsers.filter(usr => usr.email === email)

        if (!foundUser.length) {
            throw new Error(`User not found`)
        }

        if (foundUser[0].password !== password) {
            throw new Error(`Incorrect Password`)
        }

        res.status(200).json({
            message: `${email} logged in`
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            error: `${err.message}`
        })
    }
})

// 3. Export the router object to use in other files
module.exports = router

