const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { auth } = require("../middleware");
const { check, validationResult } = require("express-validator");
const cloudinary = require('cloudinary').v2;

const { storage } = require("../cloudinary")
const multer = require('multer')
const upload = multer({ storage })
const User = require("../models/User");
const { sendResetPasswordMail } = require("../mailer")

router.get("/get", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); //.select("-password"); Exclude password
    console.log(user.name);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error ");
  }
});
router.post("/resetPassword", async (req, res) => {

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ status: false, msg: "Please check your email again. User not found." });
    }
    const result = await sendResetPasswordMail(user.email);
    if (result == true) {
      return res.json({ status: true, msg: "Please wait for admin to approve your request via email." });
    }
    else {
      return res.json({ status: false, msg: "Something went wrong." });
    }
  } catch (error) {
    console.error(err.message);
    res.status(404).send("Server Error");
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
      return res.json({ status: false, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.json({ status: false, msg: "Please check your email and password again!" });
      }
      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.json({ status: false, msg: "Please check your email and password again!" });
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
          res.json({ status: true, token: token });
        }
      );
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
      return res.json({ status: false, errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.json({ status: false, msg: "User Already Exists" });
      }

      user = new User({
        name,
        email,
        password
      });

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
          res.json({ status: true, token: token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.put('/update/:id', auth, upload.single('image'), [
  check("name", " Name is Required and Cannot be over 20 or Less than 5 Digits.")
    .not()
    .isEmpty()
    .isLength({ max: 30, min: 5 }),
  check("email", "Please include a valid Email").isEmail(),
  check('newpassword')
    .isLength({ min: 8 })
    .withMessage('must be at least 8 chars long')
    .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")
    .withMessage('Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'),
]
  , async (req, res) => {
    const authUser = req.user.id;

    if (req.params.id !== authUser) {
      return res.json({ status: false, msg: "No authenication" });
    }

    const { name, email, oldpassword, newpassword } = req.body;

    try {
      let user = await User.findById({ _id: authUser });
      if (!user) {
        return res.json({ status: false, msg: "User not found." });
      }
      const isMatch = await bcrypt.compare(oldpassword, user.password);
      if (!isMatch) {
        return res.json({ status: false, msg: "Password doesn't match last password" });
      }

      if (req.file) {
        await cloudinary.uploader.upload(req.file.path, (error, result) => {
          if (error) {
            return res.json({ status: false, msg: 'Error uploading image to Cloudinary' });
          }

          user.image = result.secure_url;
        });
      }

      user.name = name;
      user.email = email;
      user.password = newpassword;

      await user.save();
      const updatedUser = await User.findById(authUser).select("-password");
      res.json({ status: true, msg: 'Successfully updated user.' });

    } catch (err) {
      console.error(err.message);
      res.status(404).send("Server Error");
    }
  })

module.exports = router;
