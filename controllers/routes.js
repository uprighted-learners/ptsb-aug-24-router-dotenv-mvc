const router = require("express").Router();
const { v4: uuid_v4, validate: uuidValidate} = require("uuid");
const { read, save } = require("../helpers/rw");
const dbPath = "./db/db.json";

/* 
    Team Name
    Sport Type
    Founded
    Location
    Achievements
    Championships
    Famous Players
*/

router.get("/", (req, res) => {
	try {
        const db = read(dbPath)
        if (!db.length) {
            throw new Error(`Empty database. Say waaaaa?!`)
        }

        res.status(200).json(db)

    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.post("/create", (req, res) => {
	try {
		// create an id for the entry
		const id = uuid_v4();
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
        
        const db = read(dbPath)
        db.push({ id, ...req.body })
        save(db, dbPath)

        res.status(201).json({
            message: `Sports team created`
        })

	} catch (err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.get("/:id", (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        
        if (!uuidValidate(id)) {
            throw new Error(`Please provide a valid UUID or GUID`)
        }

        

    } catch(err) {
        res.status(500).json({
            error: `${err}`
        })
    }
});

router.put("/:id", (req, res) => {
	res.send("Updating one sports teams");
});

router.delete("/:id", (req, res) => {
	res.send("Deleting one sports teams");
});

module.exports = router;
