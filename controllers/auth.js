// 1. import express router
const router = require("express").Router()
const users = `./db/users.json`
const { read, save } = require("../helpers/rw")


// 2. Perform your endpoint handling. Router gives access to all HTTP methods
router.post("/register", (req, res) => {
    // Initially reads users db (returns [] if empty)
    const allUsers = read(users)
    const newUser = req.body

    // appends to the array anything from the request object
    allUsers.push(newUser)

    // saves it to the json (and overwrites it.)
    save(allUsers, users)

    // returns response with a result
    res.status(201).json({
        message: `User created`,
        newUser
    })

})

router.post("/login", (req, res) => {
    // TODO: try your shot at reading your database and returning its contents to the client
})

// 3. Export the router object to use in other files
module.exports = router

