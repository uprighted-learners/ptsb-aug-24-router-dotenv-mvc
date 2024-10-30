const { mongoose } = require("../db")

const User = new mongoose.Schema(
    {
        fullName: {
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
    { timestamps: true }
)
console.log("potato 3000")
module.exports = mongoose.model("user", User)
