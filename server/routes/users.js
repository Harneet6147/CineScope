const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UsersModel.js");

const router = express.Router();

router.route("/register")
    .post(async (req, res) => {

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (user) {
            return res.json({
                "message": "User already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({
            username: username,
            password: hashedPassword
        })
        await newUser.save();
        res.json("User Successfully Registered");

    });

router.route("/login")
    .post(async (req, res) => {

        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(400)
                .json({
                    "message": "User Not Found"
                })
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400)
                .json({
                    "message": "Invalid Credentials"
                })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({
            "message": "User Login successful",
            "UserID": user._id,
            "token": token
        })
    });

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};




module.exports = { router, verifyToken };