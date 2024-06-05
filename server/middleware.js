const jwt = require("jsonwebtoken");
const config = require("config");
const Csv = require("./models/Csvs")

module.exports.auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No token, Authorization Denied" });
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports.isLoggedIn = (req, res, next) => {
    const token = req.header("x-auth-token");
    console.log("token", token);
    next();
}

module.exports.isOwner = async (req, res, next) => {

    const id = req.params.id;
    console.log("id in isOwner", id)
    // next();
    // const csv = await Csv.findById(id);
    // if (!campground.author.equals(req.user._id)) {
    //     req.flash('error', 'You do not have permission to do that');
    //     return res.redirect(`/campgrounds/${id}`);
    // }
    // next();
}