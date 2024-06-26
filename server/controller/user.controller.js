const UserService = require("../services/user.services")
const config = require("config");
const { sendNewPasswordMail } = require("../mailer")


exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserService.checkExistingUser(email);

        if (user) {
            res.status(400).json({ status: false, msg: "User already exist." });
            return;
        }

        const successRes = await UserService.registerUser(name, email, password);

        if (successRes) {
            res.json({ status: true, msg: "Create a new user successfully." })
        } else {
            res.status(400).json({ status: false, msg: "Can't register user." });
        }

    } catch (error) {
        res.status(400).json({ status: false, msg: "Something went wrong!" });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserService.checkExistingUser(email);


        if (!user) {
            res.status(400).json({ status: false, msg: "User doesn't exist." });
            return;
        }


        const isMatch = await user.comparePassword(password);

        if (isMatch === false) {
            res.status(400).json({ status: false, msg: "Email or Password incorrect!" });
            return;
        }

        let tokenData = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image
        };
        if (isMatch === true) {
            const token = await UserService.generateToken(tokenData, config.get("jwtSecret"), '1h');

            res.status(200).json({ status: true, token: token });
        }
    } catch (error) {
        res.status(400).send("Something went wrong!");
    }
}
exports.getUsers = async (req, res, next) => {
    try {
        const { email } = req.body;

        const users = await UserService.fetchAllUsers();

        if (!users) {
            return res.status(400).json({ status: false, msg: "Something went wrong. Cannot get all users." });
        }

        res.status(200).json({ status: true, users: users });
    }
    catch (error) {
        res.status(400).json({ status: false, msg: "Something went wrong!" });
    }
}

exports.resetUser = async (req, res, next) => {
    try {
        const { id, name, email, password } = req.body;

        const user = await UserService.checkExistingUserById(id);

        if (!user) {
            return res.status(400).json({ status: false, msg: "User not found." });
        }

        const result = await sendNewPasswordMail(email, password);
        if (result !== true) {
            return res.json({ status: false, msg: "Something went wrong with email." });
        }

        await UserService.resetUser(user, name, email, password);

        res.status(200).json({ status: true });

    }
    catch (error) {
        res.status(400).json({ status: false, msg: "Something went wrong!" });
    }
}

