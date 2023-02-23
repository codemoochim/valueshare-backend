const { Strategy: JwtStrategy } = require("passport-jwt");

const { secret } = require("../../utils/jwt");

const cookieExtractor = (req) => {
	const { token } = req.cookies;
	return token;
};

const opts = {
	secretOrKey: secret,
	jwtFromRequest: cookieExtractor,
};

module.exports = new JwtStrategy(opts, (user, done) => {
	done(null, user);
});
