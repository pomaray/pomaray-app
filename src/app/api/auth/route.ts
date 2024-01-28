import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { type User } from "@/types/user";

interface TokenResponse {
	user?: User;
}

interface LoginResponse {
	user?: User;
	token?: string;
}

export async function GET() {
	const END_POINT = process.env.LOGIN_ENDPOINT as string;

	try {
		const token = cookies().get("token")?.value;
		if (!token) {
			throw new AxiosError("No esta autorizado", "401");
		}
		const response: AxiosResponse<TokenResponse> = await axios.get(END_POINT, {
			headers: {
				Authorization: `Bearer ${token.trim()}`,
			},
		});

		const { user } = response.data;
		if (!user) {
			throw new Error("Usuario no recibido desde el servidor");
		}

		return NextResponse.json({ user });
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

export async function POST(req: NextRequest) {
	try {
		const END_POINT = process.env.LOGIN_ENDPOINT as string;

		const ip = req.ip || req.headers.get("X-Forwarded-For");
		if (!ip) {
			throw Error("No IP address provided");
		}
		console.log(ip);

		const { username, password } = await req.json();
		const response: AxiosResponse<LoginResponse> = await axios.post(END_POINT, {
			ip,
			username,
			password,
		});

		const { user, token } = response.data;
		if (!user || !token) {
			throw new Error("Usuario no recibido desde el servidor");
		}

		cookies().set("token", token, { secure: true });
		return NextResponse.json({ user, ip });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const { status, code } = error.toJSON() as AxiosError;

			return NextResponse.json(
				{
					message: error.toJSON(),
					status: status,
				},
				{
					status: status,
					statusText: code,
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
