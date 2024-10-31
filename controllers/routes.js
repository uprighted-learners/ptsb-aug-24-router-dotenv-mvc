const router = require("express").Router();
const Team = require("../models/team")

router.get("/", async (req, res) => {
	try {
        const allItems = await Team.find()
        console.log(allItems)

        res.status(200).json(allItems)

    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.post("/create", async (req, res) => {
	try {
		// create an id for the entry
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
            throw new Error(`Please provide all properties`)
		}
        
        const newEntry = new Team(req.body)
        await newEntry.save()

        res.status(201).json({
            message: `Sports team created`,
            newEntry
        })

	} catch (err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.get("/:id", async (req, res) => {
    try {
        // destructure the id
        const { id } = req.params

        // You can grab items by many different methods (filter with find or findOne)
        // const foundItem = await Team.findOne({ _id: id })
        const foundItem = await Team.findById(id)

        // ! REMEMBER different methods return empty different (null vs [] vs -1)
        if (!foundItem) throw new Error(`None found`)
        
        res.status(200).json(foundItem)
        
    } catch(err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.put("/:id", (req, res) => {
    try {
        // destructure the id
        const { id } = req.params
        
        // check if id is a UUID or GUID
        if (!uuidValidate(id)) {
            throw new Error(`Please provide a valid UUID or GUID`)
        }

        const db = read(dbPath)
        // We grab index of where data resides
        const foundIndex = db.findIndex(i => i.id === id)
        
        // it .findIndex returns -1 if nothing's found
        if (foundIndex === -1) {
            throw new Error(`${id} not found`)
        }

        // Reassign db values in our copy of the db
        // Only reassign if they exist using Nullish Coalescing operator
        // works like an expression and returns the side that's truthy
        db[foundIndex].teamName = req.body.teamName ?? db[foundIndex].teamName
        db[foundIndex].sportType = req.body.sportType ?? db[foundIndex].sportType
        db[foundIndex].founded = req.body.founded ?? db[foundIndex].founded
        db[foundIndex].location = req.body.location ?? db[foundIndex].location
        db[foundIndex].achievements = req.body.achievements ?? db[foundIndex].achievements
        db[foundIndex].championships = req.body.championships ?? db[foundIndex].championships
        db[foundIndex].famousPlayers = req.body.famousPlayers ?? db[foundIndex].famousPlayers

        save(db, dbPath)

        res.status(200).json({
            message: `Modified`,
            db: db[foundIndex]
        })

        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.delete("/:id", (req, res) => {
    try {
        const { id } = req.params
        
        if (!uuidValidate(id)) {
            throw new Error(`Please provide a valid UUID or GUID`)
        }
        
        const db = read(dbPath)
        
        // Check if id matches one in the db
        const rest = db.filter(i => i.id !== id)
        
        // Handle something not found
        if (db.length === rest.length) {
            throw new Error(`No entry found`)
        }

        save(rest, dbPath)

        res.status(200).json({
            message: `${id} removed from the db`
        })

    } catch(err) {
        console.log(err)
        res.status(500).json({
            error: `${err}`
        })
    }
});

module.exports = router;
