// 유저정보 응답 시 비밀번호를 제외한 정보만 응답합니다.

// 페스워드 제외
const noPwd = (user) => {
	const userWithOutPwd = user;
	console.log(1212);
	console.log(userWithOutPwd);
	console.log(1212);
	delete userWithOutPwd.password;

	console.log(3434);
	console.log(userWithOutPwd);
	console.log(3434);
	return userWithOutPwd;
};

module.exports = noPwd;
