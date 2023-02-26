const eamilFormCheck = (email) => {
	return /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
		email,
	);
};

const phoneFormCheck = (phone) => {
	return /^\d{3}-\d{4}-\d{4}$/.test(phone);
};

module.exports = {
	eamilFormCheck,
	phoneFormCheck,
};
