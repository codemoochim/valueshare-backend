import dayjs from "dayjs";

function issueOrderNum() {
	const newOrderNumber = dayjs(Date.now()).format("YYYY-MM-DD");
	const random = () => {
		const randomNum = Math.ceil(Math.random() * 100000000);
		return randomNum;
	};
	return `${newOrderNumber}-${random()}`;
}
export default issueOrderNum;
