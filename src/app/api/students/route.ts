const END_POINT = process.env.STUDENT_ENDPOINT ?? "";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const name = searchParams.get("name");
	const tech = searchParams.get("tech");
	const year = searchParams
		.get("year")
		?.split(",")
		.map((value) => Number(value));

	const url = `${END_POINT}?${name && `name=${name}`}`;
}
