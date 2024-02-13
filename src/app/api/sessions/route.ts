import { TOKEN_COOKIE } from "@/types/request/auth";
import { SessionsResponse } from "@/types/responses/auth";
import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const END_POINT = process.env.TOKEN_ALL_ENDPOINT as string;

	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			throw new AxiosError("No esta autorizado", "401");
		}
		const response: AxiosResponse<SessionsResponse> = await axios.get(
			END_POINT,
			{
				headers: {
					Authorization: `Bearer ${token.trim()}`,
				},
			},
		);

		const { sessions } = response.data;
		if (!sessions) {
			throw new Error("Sessiones no recibidas desde el servidor.");
		}

		return NextResponse.json({ sessions });
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
