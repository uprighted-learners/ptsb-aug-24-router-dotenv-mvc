// ? [STEP 3]
// Import datbase
const { mongoose } = require("../db")

// Schema defines how Collection data will be structured
const User = new mongoose.Schema(
    {
        // Properties (columns) of Document entry into User Collection
        fullName: {
            // Validators (allow verification of many variables)
            type: String,
            required: true,
            unique: false
        },
        age: {
            type: Number,
            required: true,
            min: 18
        },
        email: {
            type: String,
            maxLength: 48,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        password: {
            type: String,
            required: true
        }
    },
    // Adds createdAt and updatedAt values to our document entries
    { timestamps: true }
)

// Export creates a model of the schema to be used in our controllers
module.exports = mongoose.model("user", User)
