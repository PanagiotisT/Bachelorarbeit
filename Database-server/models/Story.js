const mongoose = require('mongoose');

const schema = mongoose.Schema;

let storySchema = new schema(
	{
		name: String,
		description: String,
		image: String,
		UnityWebGL: String,
		scenes: [{
			name: String,
			text: String
		}],
		characters: {
			total: Number,
			teller: Boolean,
			character: [{type: String}],
		}
	},
	{ collection: "Stories" }
);

module.exports = mongoose.model('Stories', storySchema);
