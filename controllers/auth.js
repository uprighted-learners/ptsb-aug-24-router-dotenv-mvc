// 1. import express router
const router = require("express").Router();
// ? [Step 4]
// Import our model to use it to connect between db and the client
const User = require("../models/user");

// Library allowing us to hash and verify hashed passwords
const bcrypt = require("bcrypt");
// Import salt value for our hash
const SALT = Number(process.env.SALT);

// 2. Perform your endpoint handling. Router gives access to all HTTP methods
router.post("/register", async (req, res) => {
	try {
		// Object destructuring our body
		const { fullName, age, email, password } = req.body;

		if (!fullName || !age || !email || !password) {
			throw new Error(`Please provide full name, age, email, and password`);
		}
		// Create a new instance of model
		const newUser = new User({
			fullName,
			age,
			email,
            // hashSync hashes the password using SALT many times
			password: bcrypt.hashSync(password, SALT),
		});
		// Save our model to the db
		await newUser.save();

		// returns response with a result
		res.status(201).json({
			message: `User created`,
			newUser,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: `${err}`,
		});
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw new Error(`Please provide email & password`);
		}

		const foundUser = await User.findOne({ email });

		if (!foundUser) throw new Error(`User not found`);

        // Need to check if the password from db (hashed) matches unhashed pwd from req
        const verifiedPwd = await bcrypt.compare(password, foundUser.password)
        
		if (!verifiedPwd) throw new Error("Invalid password");

		res.status(200).json({
			message: `${foundUser.email} logged in`,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: `${err.message}`,
		});
	}
});

// 3. Export the router object to use in other files
module.exports = router;
