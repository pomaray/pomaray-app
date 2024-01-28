import axios, { AxiosError, AxiosResponse } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./types/user";
import { log } from "console";

interface TokenResponse {
	user?: User;
}

export async function middleware(request: NextRequest) {
	const END_POINT = process.env.TOKEN_ENDPOINT as string;

	try {
		console.log(END_POINT);

		const token = request.cookies.get("token");
		if (!token) {
			throw new AxiosError("No esta autorizado", "401");
		}
		const response: AxiosResponse<TokenResponse> = await axios.get(END_POINT, {
			headers: {
				Authorization: `Bearer ${token.value.trim()}`,
			},
		});

		const { user } = response.data;
		if (!user) {
			throw new Error("Usuario no recibido desde el servidor");
		}

		return NextResponse.next();
	} catch (error) {
		request.cookies.delete("token");
		return NextResponse.redirect(new URL("/acceder", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
