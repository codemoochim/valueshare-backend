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

// https://valueshare3.s3.ap-northeast-2.amazonaws.com/images/ed55651b-3bf6-4fc7-ac28-071e319c448a_scaled-800-%5B1612235046394%5Dba-00092_front.jpg
