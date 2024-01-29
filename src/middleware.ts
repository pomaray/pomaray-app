import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "./types/user";

interface TokenResponse {
	user?: User;
}

export async function middleware(request: NextRequest) {
	const END_POINT = process.env.TOKEN_ENDPOINT as string;

	try {
		const token = request.cookies.get("token");
		if (!token) {
			throw new Error("No hay token");
		}
		const response = await fetch(END_POINT, {
			headers: {
				Authorization: `Bearer ${token.value.trim()}`,
			},
		});

		if (!response.ok) throw new Error("NO fue un ok");

		const { user } = (await response.json()) as TokenResponse;
		if (!user) {
			throw new Error("Usuario no recibido desde el servidor");
		}

		return NextResponse.next();
	} catch (error) {
		console.error(error);

		request.cookies.delete("token");
		return NextResponse.redirect(new URL("/acceder", request.url));
	}
}

export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
