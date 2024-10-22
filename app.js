require("dotenv").config()
const express = require("express")
const app = express()

const PORT = process.env.PORT
const HOST = process.env.HOST

// 4. Import the auth controller
const authController = require("./controllers/auth")
const routesController = require("./controllers/routes")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 5. Assign it to the middleware method
// can add main route to .use() to make everything sub routes
app.use("/auth", authController)
app.use("/api", routesController)

app.listen(PORT, HOST, () => {
    console.log(`[server] listening on ${HOST}:${PORT}`)
})

/* 
    ? Model-View-Controller (MVC)
    * architecture or system design style
    * breaks full stack application into:
        * model (data - ex: database)
        * view (client - ex: browser or Postman)
        * controller (logic - ex: endpoints)
    * we use MVC for Separation of Concerns
*/

