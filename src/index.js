const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connect = () => {
	if (process.env.NODE_ENV !== "production") {
		mongoose.set("debug", true);
	}
};
//
const { MongoDB_Root, MongoDB_Pwd, MongoDB_dbName } = process.env;
mongoose.set("strictQuery", false);
mongoose.connect(
	`mongodb+srv://${MongoDB_Root}:${MongoDB_Pwd}@${MongoDB_dbName}.ywzx8pk.mongodb.net/test`,
	{
		dbName: `${MongoDB_dbName}`,
		useNewUrlParser: true,
		autoIndex: false, // diable autoIndex
	},
	(error) => {
		if (error) {
			console.error("몽고디비 연결에 에러가 있습니다.", error);
		} else {
			console.log("몽고디비가 정상적으로 연결되었습니다.");
		}
	},
);

mongoose.connection.on("connected", () => {
	console.log("몽구스가 연결되었습니다.");
});
mongoose.connection.on("disconnected", () => {
	console.log("몽구스가 연결이 끊겼습니다.");
});
mongoose.connection.on("reconnected", () => {
	console.log("몽구스에 재연결 시도합니다.");
});
mongoose.connection.on("reconnectFailed", () => {
	console.log("몽구스가 재연결에 실패했습니다.");
});

module.exports = connect;
