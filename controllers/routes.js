/* 
    Create boilerplate for a few CRUD routes for our sports
    * need an endpoint for getting all sports teams
    * need an endpoint to get one team (id)
    * need an endpoint to update a team (id)
    * need an endpoint to delete a team (id)
    * all of those should be subroutes of /api endpoint
*/

const router = require("express").Router()

router.get("/", (req, res) => {
    res.send("Getting all sports teams")
})

router.post("/create", (req, res) => {
    res.send("Created a sports team")
})

router.get("/:id", (req, res) => {
    res.send("Getting one sports teams")
})

router.put("/:id", (req, res) => {
    res.send("Updating one sports teams")
})

router.delete("/:id", (req, res) => {
    res.send("Deleting one sports teams")
})

module.exports = router