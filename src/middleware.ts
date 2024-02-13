//----Imports------------------------------------------------------

import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { TOKEN_COOKIE, TOKEN_ENDPOINT, LOGIN_PAGE } from "@/types/request/auth";
import { type TokenResponse } from "@/types/responses/auth";

//----Middleware----------------------------------------------------

export async function middleware(request: NextRequest) {
	try {
		// Validar si existe un token guardado en las cookies.
		const token = request.cookies.get(TOKEN_COOKIE);
		if (!token) {
			throw new Error("No token provided.");
		}

		// Comprobar si el token es valido en la A.P.I.
		const response = await fetch(TOKEN_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${token.value.trim()}`,
			},
		});

		if (!response.ok) throw new Error("Token not valid.");

		// Obtener el usuario de la respuesta de la A.P.I.
		const { user } = (await response.json()) as TokenResponse;
		if (user) {
			return NextResponse.next();
		}

		// Si el usuario no existe.
		throw new Error("No user provided by the API.");
	} catch (error) {
		console.log(error);
		
		// Eliminar le token de las cookies.
		request.cookies.delete(TOKEN_COOKIE);

		// Redireccionar al formulario de login.
		return NextResponse.redirect(new URL(LOGIN_PAGE, request.url));
	}
}

// ¡NO TOCAR!
// Ver mas en: https://nextjs.org/docs/app/building-your-application/routing/middleware
export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
