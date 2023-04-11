const bcrypt = require("bcrypt");
const formCheck = require("../utils/formCheck");
const { generateToken, generateRefreshToken } = require("../middleware/jwtMdw");
const { Admin, User } = require("../db/model/index");

// 회원가입
const registerUser = async (userInfo) => {
  try {
    const { email, password, name, phoneNumber, shipAdr } = userInfo;
    if (!formCheck.emailFormCheck(email)) {
      throw new Error("올바른 이메일을 입력해주세요");
    }
    if (password?.length < 4) {
      throw new Error("비밀번호는 4자리 이상입니다");
    }
    const [isExist, hash] = await Promise.all([
      User.findOne({ email }),
      bcrypt.hash(password, 12),
    ]);
    if (!isExist) {
      await User.create({
        email,
        password: hash,
        name,
        phoneNumber,
        shipAdr,
      });
      return "회원가입이 완료되었습니다";
    }
    // 비회원 주문이력 연동시 이메일 인증이 필요한 부분
    isExist.password = hash;

    await isExist.save();
    return "회원가입이 완료되었습니다. 기존 주문이력이 업데이트 되었습니다.";
  } catch (err) {
    throw new Error(err);
  }
};

// 로그인, JWT 토큰발급
const loginUser = async (userInfo) => {
  try {
    const { email, password } = userInfo;
    // Admin인지 User 인지 Promise.all로 병렬로 검색가능
    const isAdmin = await Admin.findOne({ email });
    if (isAdmin) {
      const checkAdminPwd = await bcrypt.compare(password, isAdmin.password);
      if (!checkAdminPwd) {
        throw new Error("비밀번호를 확인해주세요");
      }

      const accessToken = generateToken(isAdmin._id, "3d", true);
      return accessToken;
    }

    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      throw new Error("이메일을 확인해주세요");
    }
    const checkPwd = await bcrypt.compare(password, targetUser.password);
    if (!checkPwd) {
      throw new Error("비밀번호를 확인해주세요");
    }
    // 여기서 ObjectId 말고 다른 정보로 토큰을 생성하도 되는지..
    const accessToken = generateToken(targetUser._id, "2h", false);
    const refreshToken = generateRefreshToken(targetUser._id, "2w", false);

    return [accessToken, refreshToken];
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  registerUser,
  loginUser,
};
