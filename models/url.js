import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
	shortId: {
		type: String,
		required: true,
		unique: true
	},
	redirectUrl: {
		type: String, 
		required: true,
	},
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  visitHistory: [{timestamp: {type: Number},_id: false}]},
	{timestamps: true}
)

const URL = mongoose.model('url', urlSchema)

export default URL
