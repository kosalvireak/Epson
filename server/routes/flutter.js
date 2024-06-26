const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { auth } = require("../middleware");
const { check, validationResult } = require("express-validator");
const UserController = require("../controller/user.controller");
const User = require("../models/User");

router.get('/get', async (req, res) => {
    res.send("Hello from flutter get api");
})

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/getallusers', UserController.getUsers);

router.post('/resetuser', UserController.resetUser);

module.exports = router;