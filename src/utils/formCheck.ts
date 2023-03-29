const emailFormCheck = (email) => {
	return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
		email,
	);
};

const phoneFormCheck = (phoneNumber) => {
	return /^\d{3}-\d{4}-\d{4}$/.test(phoneNumber);
};

module.exports = {
	emailFormCheck,
	phoneFormCheck,
};
