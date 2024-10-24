// 1. import express router
const router = require("express").Router()
const users = `./db/users.json`
const { read, save } = require("../helpers/rw")


// 2. Perform your endpoint handling. Router gives access to all HTTP methods
router.post("/register", (req, res) => {
    try {
        // Object destructuring our body
        const { fullName, age, email, password } = req.body

        if (!fullName || !age || !email || !password) {
            throw new Error(`Please provide full name, age, email, and password`)
        }

        const allUsers = read(users)
        const newUser = {fullName, age, email, password}
    
        // appends to the array anything from the request object
        allUsers.push(newUser)
    
        // saves it to the json (and overwrites it.)
        save(allUsers, users)
    
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

