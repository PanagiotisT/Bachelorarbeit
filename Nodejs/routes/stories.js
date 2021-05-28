const express = require('express');
const router = express.Router();
const Story = require('../models/Story');

router.get('/', async function(req, res) {
	try {
		const stories = await Story.find();
		res.json(stories);
		console.info("GET /stories called")
	} catch(error) {
		console.log(err);
	}
});

module.exports = router;
