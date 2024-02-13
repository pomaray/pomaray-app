import { TOKEN_COOKIE, LOGIN_PAGE } from "@/types/request/auth";
import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
	try {
		const END_POINT = process.env.TOKEN_ENDPOINT as string;

		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
		}

		const sessionId = request.url.split("sessions/")[1];
		const url = `${END_POINT}/${sessionId}`;

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
