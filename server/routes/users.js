const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { auth } = require("../middleware");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

router.get("/get", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //.select("-password"); Exclude password
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error ");
  }
});

router.post(
  "/login",
  [
    check("email", " Please include a valid Email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Please check your email and password again!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Please check your email and password again!" });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      console.log(payload);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post(
  "/register",
  [
    check("name", " Name is Required and Cannot be over 20 or Less than 5 Digits.")
      .not()
      .isEmpty()
      .isLength({ max: 30, min: 5 }),
    check("email", "Please include a valid Email").isEmail(),
    check('password')
      .isLength({ min: 8 })
      .withMessage('must be at least 8 chars long')
      .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
      .withMessage('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put('/update/:id', [
  check("name", " Name is Required and Cannot be over 20 or Less than 5 Digits.")
    .not()
    .isEmpty()
    .isLength({ max: 30, min: 5 }),
  check("email", "Please include a valid Email").isEmail(),
  check('password')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    .withMessage('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id, name, email, lastpassword, newpassword, image } = req.body;
    try {
      let user = await User.findOne({ id });
      user = new User({
        name,
        email,
        password: newpassword,
        image
      });
      const isMatch = await bcrypt.compare(lastpassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Password doesn't match last password" });
      }
      else {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newpassword, salt);
      }
      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })

module.exports = router;
