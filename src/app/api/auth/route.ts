import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UAParser } from "ua-parser-js";
import { LOGIN_PAGE, TOKEN_COOKIE, TOKEN_ENDPOINT } from "@/types/request/auth";
import { TOKEN_EXPIRE_DAYS } from "@/utils/general";
import { LoginResponse, TokenResponse } from "@/types/responses/auth";

export async function GET() {
	const END_POINT = process.env.TOKEN_ENDPOINT as string;

	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
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

export async function POST(req: NextRequest) {
	try {
		const END_POINT = process.env.LOGIN_ENDPOINT as string;

		// Obtener el User-Agent del header
		const userAgentString = req.headers.get("User-Agent");

		// Analizar el User-Agent
		const parser = new UAParser();
		const userAgentInfo = parser.setUA(userAgentString as string).getResult();

		// Extraer información del sistema operativo y navegador
		const os = userAgentInfo.os.name || "Desconocido";
		const browser = userAgentInfo.browser.name || "Desconocido";

		const device = `${os} - ${browser}`;

		const ip = req.ip || req.headers.get("X-Forwarded-For");
		if (!ip) {
			throw Error("No IP address provided");
		}

		const { username, password } = await req.json();
		const response: AxiosResponse<LoginResponse> = await axios.post(END_POINT, {
			ip,
			username,
			password,
			device,
		});

		const { user, token } = response.data;
		if (!user || !token) {
			throw new Error("Usuario no recibido desde el servidor");
		}

		const expire = new Date();
		expire.setHours(TOKEN_EXPIRE_DAYS * 24);

		cookies().set(TOKEN_COOKIE, token, { secure: true, expires: expire });
		return NextResponse.json({ user });
	} catch (error) {
		console.log(error);

		if (axios.isAxiosError(error)) {
			const { status, code } = error.toJSON() as AxiosError;

			return NextResponse.json(
				{
					message: error.toJSON(),
					status: status ?? error.status,
				},
				{
					status: status ?? error.status,
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

export async function DELETE(req: NextRequest) {
	try {
		const token = cookies().get(TOKEN_COOKIE)?.value;
		if (!token) {
			throw new AxiosError("No esta autorizado", "401");
		}

		const url = `${TOKEN_ENDPOINT}${token}`;

		await axios.delete(url, {
			headers: {
				Authorization: `Bearer ${token.trim()}`,
			},
		});
		cookies().delete(TOKEN_COOKIE);

		return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
	} catch (error) {
		return NextResponse.redirect(new URL(LOGIN_PAGE, req.url));
	}
}
