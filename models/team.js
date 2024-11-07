const { mongoose, Schema } = require("../db")

const Team = new mongoose.Schema(
    {
        userID: {
            type: Object,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        teamName: {
            type: String,
            required: true
        },
        sportType: {
            type: String,
            required: true
        },
        founded: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        achievements: {
            type: Array,
            required: true
        },
        championships: {
            type: Array,
            required: true
        },
        famousPlayers: {
            type: Array,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("team", Team)