const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Schema noch genauer definieren wenn nötig
let storySchema = new schema(
	{
		name: String,
		description: String,
		image: String,
		scenes: [{
			// Noch anpassen und genauer definieren was eine Szene hat
			name: String,
			text: String,
			UnityWebGL: String
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
