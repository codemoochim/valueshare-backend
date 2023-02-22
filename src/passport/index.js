const passport = require("passport");
const local = require("./localStrategy");
const User = require("../db/model/index");

module.expots = () => {
	passport.serializeUser((user, done) => {
		done(null, user.email);
	});

	passport.deserializeUser(async (email, done) => {
		try {
			const user = await User.findOne({ email });
			done(null, user);
		} catch (err) {
			console.error(err);
		}
	});

	local();
};
const passportConfig = () => {};

module.exports = passportConfig;
