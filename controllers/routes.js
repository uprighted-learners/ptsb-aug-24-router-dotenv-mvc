const router = require("express").Router();
const Team = require("../models/team");

router.get("/", async (req, res) => {
	try {
		const allItems = await Team.find();

		res.status(200).json(allItems);
	} catch (err) {
		res.status(500).json({
			error: `${err}`,
		});
	}
});

router.post("/create", async (req, res) => {
	try {
		// create an id for the entry
		const { userID, fullName } = req.body.user
		const {
			teamName,
			sportType,
			founded,
			location,
			achievements,
			championships,
			famousPlayers,
		} = req.body;

		if (
			!teamName ||
			!sportType ||
			!founded ||
			!location ||
			!achievements ||
			!championships ||
			!famousPlayers
		) {
			throw new Error(`Please provide all properties`);
		}

		const newEntry = new Team({
			...req.body,
			userID,
            fullName
		});
		await newEntry.save();

		res.status(201).json({
			message: `Sports team created`,
			newEntry,
		});
	} catch (err) {
		res.status(500).json({
			error: `${err}`,
		});
	}
});

router.get("/:id", async (req, res) => {
	try {
		// destructure the id
		const { id } = req.params;

		// You can grab items by many different methods (filter with find or findOne)
		// const foundItem = await Team.findOne({ _id: id })
		const foundItem = await Team.findById(id);

		// ! REMEMBER different methods return empty different (null vs [] vs -1)
		if (!foundItem) throw new Error(`None found`);

		res.status(200).json(foundItem);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: `${err}`,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		// destructure the id
		const { id } = req.params;

		// Reassign db values in our copy of the db
		// Only reassign if they exist using Nullish Coalescing operator
		// works like an expression and returns the side that's truthy

		const updatedEntry = await Team.findByIdAndUpdate(id, {
			teamName: req.body.teamName ?? teamName,
			sportType: req.body.sportType ?? sportType,
			founded: req.body.founded ?? founded,
			location: req.body.location ?? location,
			achievements: req.body.achievements ?? achievements,
			championships: req.body.championships ?? championships,
			famousPlayers: req.body.famousPlayers ?? famousPlayers,
		});

		res.status(200).json({
			message: `Modified`,
			updatedEntry,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: `${err}`,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const deletedEntry = await Team.findByIdAndDelete(id);

		if (!deletedEntry) throw new Error(`Item not found`);

		res.status(200).json({
			message: `${id} removed from the db`,
			deletedEntry,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			error: `${err}`,
		});
	}
});

module.exports = router;
