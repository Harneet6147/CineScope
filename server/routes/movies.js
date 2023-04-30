const express = require("express");
const router = express.Router();
const MovieModel = require("../models/MovieModel.js");
const UserModel = require("../models/UsersModel.js");
const { verifyToken } = require("./users.js");


router.get("/", async (req, res) => {
    try {
        const response = await MovieModel.find({});

        res.status(200).json({
            "Movies": response
        })

    } catch (error) {
        res.status(500).json({ error })
    }

});


router.post("/", verifyToken, async (req, res) => {

    const movie = new MovieModel(req.body);
    try {
        const newMovie = await movie.save();
        res.status(200)
            .json({
                "message": "success",
                "Movie": newMovie
            })
    }
    catch (err) {
        console.log(err);
    }
});


router.put("/", verifyToken, async (req, res) => {

    const movie = await MovieModel.findById(req.body.movieID);
    const user = await UserModel.findById(req.body.userID);

    user.savedMovies.push(movie);
    await user.save();

    res.status(201).json({
        "savedMovies": user.savedMovies
    })

});

router.get("/savedMovies/ids/:userId", async (req, res) => {

    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({
            savedMovies: user?.savedMovies
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
});

router.get("/savedMovies/:userID", async (req, res) => {

    try {
        const user = await UserModel.findById(req.params.userID);
        const savedMovies = await MovieModel.find({
            _id: { $in: user.savedMovies }
        })
        res.status(201).json({
            savedMovies
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
});



module.exports = router;