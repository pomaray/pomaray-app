import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type User } from "@/types/user";

interface TokenResponse {
	user?: User;
}

interface LoginResponse {
	user?: User;
	token?: string;
}

export async function GET() {
	const END_POINT = process.env.TOKEN_ENDPOINT ?? "";

	try {
		const token = cookies().get("token")?.value;
		if (!token) {
			throw new AxiosError("No esta authorization", "401");
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
		console.error("Error en el manejado de la API:", error);

		if (axios.isAxiosError(error)) {
			if (error.code === "401") {
				return NextResponse.json({ error: "No esta autorizado" });
			}

			if (error.code === "404") {
				return NextResponse.json({ error: "El Token no existe." });
			}
		}
		return NextResponse.json({ error: "Error en el servidor" });
	}
}

export async function POST(req: Request) {
	const END_POINT = process.env.LOGIN_ENDPOINT ?? "";

	const { username, password } = await req.json();

	const response: AxiosResponse<LoginResponse> = await axios.post(END_POINT, {
		username,
		password,
	});

	const { user, token } = response.data;
	if (!user || !token) {
		throw new Error("Usuario no recibido desde el servidor");
	}

	cookies().set("token", token, { secure: true });

	return NextResponse.json({ user });
}
