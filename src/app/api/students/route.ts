import { Student } from "@/types/general";
import { STUDENT_ENDPOINT } from "@/types/request/student";
import { LOGIN_PAGE, TOKEN_COOKIE } from "@/types/request/auth";
import { StudentsResponse } from "@/types/responses/student";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const url = `${STUDENT_ENDPOINT}?${searchParams
			.toString()
			.replace("%2C", ",")}`;
		console.log(url);

		const response = await axios.get(url);
		const { total, students } = (await response.data) as StudentsResponse;

		return NextResponse.json({ total, students });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return NextResponse.json(
				{
					message: error.message,
				},
				{
					status: error.status,
					statusText: error.code,
				},
			);
		}
		return NextResponse.json(
			{
				code: "500",
				message:
					error instanceof Error
						? error.message
						: "Error interno del servidor.",
			},
			{
				status: 500,
				statusText: "ERR_INTERNAL_SERVER_ERROR",
			},
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
		}

		const body = (await request.json()) as Student;

		const response = await axios.post(STUDENT_ENDPOINT, body, {
			headers: {
				Authorization: `Bearer ${token.trim()}`,
			},
		});
		const { student } = response.data;

		if (!student) {
			throw new Error("No student provided from server");
		}

		return NextResponse.json({ student });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const response = error.response?.data;
			return NextResponse.json(
				{
					message: response.message,
				},
				{
					status: response.code || 500,
					statusText: error.code || "ERR_INTERNAL_SERVER_ERROR",
				},
			);
		}

		return NextResponse.json(
			{
				code: "500",
				status: 500,
				message:
					error instanceof Error
						? error.message
						: "Error interno del servidor.",
			},
			{
				status: 500,
				statusText: "ERR_INTERNAL_SERVER_ERROR",
			},
		);
	}
}
