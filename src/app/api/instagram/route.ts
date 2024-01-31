import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
	const options = {
		method: "GET",
		url: "https://instagram130.p.rapidapi.com/account-info",
		params: { username: "adele" },
		headers: {
			"X-RapidAPI-Key": "d778e67d54mshdf8169651fd89d8p12c1a6jsne4d4ac19da5e",
			"X-RapidAPI-Host": "instagram130.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
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
