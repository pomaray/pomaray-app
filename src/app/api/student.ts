import { API_ROUTES } from '@/config/api';
import { Student } from '@/types/student';
import { Tech } from '@/types/tech';
import { YearBookForm } from '@/types/yearbook';
import axios, { isAxiosError } from 'axios';

type GetStudentsResponse = {
  students: [Student],
  total: number
}

export async function GetStudents(data: YearBookForm, skip?: number, limit?: number): Promise<GetStudentsResponse> {
  try {
    const techKey = data.tecnique && (Object.keys(Tech).find(key => Tech[key as keyof typeof Tech] === data.tecnique) as keyof typeof Tech);
    const queryParams = new URLSearchParams();
    data.name && queryParams.set("name", data.name);
    techKey && queryParams.set("tecnique", techKey);
    skip && queryParams.set("skip", skip.toString());
    limit && queryParams.set("limit", limit.toString());
    (data.years && data.years.length > 1) && queryParams.set("years", data.years.toString())

    const url = `${API_ROUTES.estudiantes}/?${queryParams.toString()}`;
    const response = await axios.get<GetStudentsResponse>(url);
    return response.data;
  } catch (err) {
    if (isAxiosError(err)) {
      switch (err.response?.status) {
        case 400:
          throw new Error("Los datos proporcionados son incorrectos");
        case 404:
          throw new Error("No se encontró ningún estudiante");
        case 422:
          throw new Error("No se pudo procesar la petición");
        case 500:
          throw new Error("Hubo un error interno del servidor");
        default:
          if (err.message === "Network Error") {
            throw new Error("La solicitud ha expirado");
          }
          break;
      }
    }

    throw err;
  }
}
