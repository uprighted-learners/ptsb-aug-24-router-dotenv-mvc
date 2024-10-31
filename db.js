// Install mongoose and import it
const mongoose = require("mongoose")
// Add mongoose url to your .env file and import it (mongodb://127.0.0.1:27017/nameOfYourDBGoesHere)
const DB_URL = process.env.DB_URL

const dbConnect = async () => {
    try {
        // ensures that it only fulfills logic as written
        mongoose.set("strictQuery", true)
        // connects to our database service
        await mongoose.connect(DB_URL)
        console.log(`[db] connected to: ${DB_URL}`)
    } catch(err) {
        console.log(`[db] error: ${err}`)
    }
}
// export connection but also everything mongooose related without importing mongoose elsewhere
module.exports = { dbConnect, mongoose }

// ? [STEP 1]