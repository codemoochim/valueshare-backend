const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../db/model/index");

module.exports = () => {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email", // req.body.email
				passwordField: "password",
				passReqToCallback: false,
			},
			async (email, password, done) => {
				try {
					const userCheck = await User.findOne({ email });
					if (userCheck) {
						const result = await bcrypt.compare(password, userCheck.password);
						if (result) {
							done(null, userCheck);
						} else {
							done(null, false, { message: "비밀번호가 일치하지 않습니다" });
						}
					} else {
						done(null, false, { message: "가입되지 않은 회원입니다" });
					}
				} catch (err) {
					console.error(err);
					done(err);
				}
			},
		),
	);
};
