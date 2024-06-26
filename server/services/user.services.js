const User = require("../models/User")
const jwt = require("jsonwebtoken");

class UserService {
    static async registerUser(name, email, password) {
        try {
            const user = new User({
                name,
                email,
                password
            });
            await user.save();
            return true;
        } catch (error) {
            return false;
        }
    }

    static async checkExistingUser(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async checkExistingUserById(id) {
        try {
            return await User.findById({ _id: id });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

    static async fetchAllUsers() {
        try {
            return await User.find({});
        } catch (error) {
            throw error;
        }
    }


    static async resetUser(user, name, email, password) {
        try {
            user.name = name;
            user.email = email;
            user.password = password;

            await user.save();
        } catch (error) {
            throw error;
        }
    }
}
module.exports = UserService;