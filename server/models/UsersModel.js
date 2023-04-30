const mongoose = require("mongoose");
const MovieModel = require("./MovieModel")


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    savedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movies" }]
})

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;