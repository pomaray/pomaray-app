import { Student } from "@/types/student";
import axios from "axios";
import { NextResponse } from "next/server";

const END_POINT = process.env.STUDENT_ENDPOINT ?? "";

interface FindStudents {
	total: number;
	students: Student[];
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		const url = `${END_POINT}?${searchParams}`;
		const response = await axios.get(url);
		const { total, students } = (await response.data) as FindStudents;

		return NextResponse.json({ total, students });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			NextResponse.json(
				{},
				{
					status: error.status,
					statusText: error.status?.toString() ?? "Error",
				},
			);
		}
		return NextResponse.json(
			{
				message: error,
			},
			{
				status: 500,
				statusText: "ERR_INTERNAL_SERVER",
			},
		);
	}
}
