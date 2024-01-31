import { STUDENT_ENDPOINT } from "@/types/request/student";
import { LOGIN_PAGE, TOKEN_COOKIE } from "@/types/request/auth";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
		}

		const studentId = request.url.split("students/")[1]; // Obtén el ID de la solicitud
		const student = await request.json();

		const url = `${STUDENT_ENDPOINT}/${studentId}`; // Añade el ID a la URL

		await axios.put(url, student, {
			headers: {
				Authorization: `Bearer ${token.trim()}`,
			},
		});

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

export async function DELETE(request: NextRequest) {
	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
		}

		const studentId = request.url.split("students/")[1]; // Obtén el ID de la solicitud

		const url = `${STUDENT_ENDPOINT}/${studentId}`; // Añade el ID a la URL

		const response = await axios.delete(url, {
			headers: {
				Authorization: `Bearer ${token.trim()}`,
			},
		});

		const { message } = response.data;

		return NextResponse.json({ message });
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
