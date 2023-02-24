const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../db/model/index");
// const passport = require("passport");
// const local = require("./localStrategy");
// const User = require("../db/model/index");

module.expots = () => {
	// 책보고 만듬
	// passport.serializeUser((user, done) => {
	// 	done(null, user.email);
	// });
	// passport.deserializeUser(async (email, done) => {
	// 	try {
	// 		const user = await User.findOne({ email });
	// 		done(null, user);
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// });
	// local();
};
