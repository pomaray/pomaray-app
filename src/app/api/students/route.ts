import { Student } from "@/types/student";
import axios from "axios";
import { NextResponse } from "next/server";

const END_POINT = process.env.STUDENT_ENDPOINT ?? "";

interface FindStudents {
	total: number;
	stundets: Student[];
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const url = `${END_POINT}?${searchParams}`;
	const response = await axios.get(url);
	const { total, stundets } = (await response.data) as FindStudents;

	return NextResponse.json({ total, stundets });
}
