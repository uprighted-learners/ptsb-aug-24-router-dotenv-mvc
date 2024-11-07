const jwt = require("jsonwebtoken")
const User = require("../models/user")
const JWT_KEY = process.env.JWT_KEY

const sessionValidation = async (req, res, next) => {
    try {
        // Preflight request -- verifies if endpoint accepts HTTP methods
        if (req.method === "OPTIONS") next()
        // Check if token has been provided
        if (!req.headers.authorization) throw new Error("Forbidden")
        // Sanitize the token to remove word 'Bearer' if it exists
        const authToken = req.headers.authorization.includes("Bearer")
            ? req.headers.authorization.split(" ")[1]
            : req.headers.authorization
        // Extricate payload and verify token authenticity
        const payload = jwt.verify(authToken, JWT_KEY)

        // Call users collectio nfind user matching payload id
        const foundUser = await User.findById(payload._id)

        // Add the user to the request
        req.body.user = { userID: foundUser._id, fullName: foundUser.fullName }

        // Continue to the next function
        next()
    } catch(err) {
        console.error(err)
        res.status(500).json({
            message: `${err.message}`
        })
    }
}

module.exports = sessionValidation