const { User, Order } = require("../db/model/index");
const { emailFormCheck } = require("../utils/formCheck");

const handleUserInfo = async (userId, userInfo) => {
  try {
    const { name, phoneNumber, shipAdr, shipNote, email } = userInfo;

    // 이메일 회원검증
    const memberCheck = await User.findById({ _id: userId }, { password: 0 });
    // 기존 유저정보 수정
    memberCheck.email = email;
    memberCheck.phoneNumber = phoneNumber;
    memberCheck.name = name;
    memberCheck.shipAdr = shipAdr;
    memberCheck.shipNote = shipNote;
    await memberCheck.save();
    return memberCheck;
  } catch (err) {
    throw new Error(err);
  }
};

const findUserInfo = async (userId) => {
  try {
    const userInfo = await User.findById({ _id: userId }, { password: 0 });
    if (!userInfo) {
      throw new Error("회원 정보가 없습니다");
    }
    const userOrderHistory = await Order.find({ userId: userInfo });

    return [userInfo, userOrderHistory];
  } catch (err) {
    throw new Error(err);
  }
};

const updateUserEmail = async (userId, userEmail) => {
  try {
    const userInfo = await User.findById({ _id: userId }, { password: 0 });
    userInfo.email = userEmail;

    await userInfo.save();

    return userId;
  } catch (err) {
    throw new Error(err);
  }
};

const updateUserAddress = async (userId, body) => {
  try {
    const userInfo = await User.findById({ _id: userId }, { password: 0 });
    const { shipAdr, shipNote, name, phoneNumber } = body;
    if (!shipAdr) {
      throw new Error("주소를 입력하세요");
    }
    userInfo.shipAdr = shipAdr;
    userInfo.shipNote = shipNote;
    userInfo.name = name;
    userInfo.phoneNumber = phoneNumber;

    await userInfo.save();

    return userInfo;
  } catch (err) {
    throw new Error(err);
  }
};

const deleteAccount = async (userId) => {
  try {
    const userInfo = await User.findByIdAndDelete({ _id: userId });
    if (!userInfo) {
      throw new Error("탈퇴가 정상적으로 이루어지지 않았습니다.");
    }
    return "탈퇴처리 되었습니다.";
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  handleUserInfo,
  findUserInfo,
  updateUserEmail,
  updateUserAddress,
  deleteAccount,
};
