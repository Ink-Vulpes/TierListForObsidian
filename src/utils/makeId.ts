export default function makeid(length: number): string {
	let res = "";
	const charSet =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		res += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	return res;
}
