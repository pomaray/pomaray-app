import { Student } from "@/types/student";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const END_POINT = process.env.STUDENT_ENDPOINT ?? "";

interface FindStudents {
	total: number;
	students: Student[];
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Generar una clave única para cada solicitud basada en la URL y los parámetros de búsqueda.
		const cacheKey = `student-${searchParams}`;

		// Intentar obtener la respuesta almacenada en caché.
		const cachedResponse = cookies().get(cacheKey);

		if (cachedResponse) {
			return NextResponse.json(cachedResponse);
		}

		// Si no hay respuesta en caché, realizar la solicitud a la API.
		const url = `${END_POINT}?${searchParams}`;
		const response = await axios.get(url);
		const { total, students } = (await response.data) as FindStudents;

		// Guardar la respuesta en caché con una vida útil (ttl) de 1 hora (puedes ajustar esto según tus necesidades).
		cookies().set(cacheKey, String({ total, students }));

		return NextResponse.json({ total, students });
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return NextResponse.json(
				{
					status: error.status ?? 404,
					message: error.message,
				},
				{
					status: error.status,
					statusText: error.status?.toString() ?? "Error",
				},
			);
		}
		return NextResponse.json(
			{
				message: error,
			},
			{
				status: 500,
				statusText: "ERR_INTERNAL_SERVER",
			},
		);
	}
}
