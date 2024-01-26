import axios from "axios";

const END_POINT = process.env.STUDENT_ENDPOINT ?? "";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const url = `${END_POINT}?${searchParams}`;
	const response = await axios.get(url);
	console.log(url);
}
