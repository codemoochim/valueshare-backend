const { nanoid } = require("nanoid"); // 왜 uuid v4가 아닌 nanoid 를 선택했는지?

const shortId = {
	type: String,
	default: () => {
		return nanoid();
	},
	require: true,
	index: true,
};

module.exports = shortId;
