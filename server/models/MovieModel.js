const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    hashTags: [{ type: String, required: true }],
    storyLine: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
})

const MovieModel = mongoose.model("movies", MovieSchema);
module.exports = MovieModel;