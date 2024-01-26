import { useState, useEffect } from "react";
import { type Student } from "@/types/student";
import { AxiosError } from "axios";

interface YearBookResponse {
	/* 
		Respuesta de la API
	*/
	total: number;
	students: Student[];
}

interface FormRequest {
	/* 
		Solicitud del formulario, hace referencia
		a los *query params* que se utilizaran en la 
		petición de la API. 
	*/
	studentName?: string;
	studentSchoolYear?: number[];
	studentTech?: string;
}

interface YearBookHook {
	isError?: boolean;
	isNotFound?: boolean;
	isLoading: boolean;

	currentPage?: number;
	totalPages: number;

	students?: Student[];
	formRequest: FormRequest;

	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	setFormRequest: React.Dispatch<React.SetStateAction<FormRequest>>;
}

const useYearBook: () => YearBookHook = () => {
	// Configuraciones del *Hook*.
	const limit = 30;
	const currentYear = new Date().getFullYear();
	const baseUrl = "/api/students";

	// Estados.
	const [isError, setIsError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	const [students, setStudents] = useState<Student[]>();
	const [formRequest, setFormRequest] = useState<FormRequest>({
		studentName: "",
		studentSchoolYear: [currentYear],
		studentTech: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Construir los *query params* según FormRequest.
				const params = new URLSearchParams();
				if (formRequest.studentName)
					params.set("name", formRequest.studentName);
				if (formRequest.studentTech)
					params.set("tech", formRequest.studentTech);
				if (formRequest.studentSchoolYear)
					params.set("year", formRequest.studentSchoolYear.toString());

				/* 
					Calcular cuantos estudiantes se debe **saltar según la pagina actual**.
					Ej. si currentPage es 1 (la primera página) y limit es 10,
					entonces skip sería 0, lo que significa que no se omite ningún
					estudiante porque estamos en la primera página, si pagina actual es 
				*/
				const skip = (currentPage - 1) * limit;
				const url = `${baseUrl}?${params.toString()}&limit=${limit}&skip=${skip}`;

				const response = await fetch(url);
				if (!response.ok) {
					setIsError(true);
					return;
				}

				const { total, students } = (await response.json()) as YearBookResponse;

				setTotalPages(Math.ceil(total / limit));
				setStudents(students);
			} catch (error) {
				if (error instanceof AxiosError) {
					setIsNotFound(error.code === "404");
					return;
				}

				setTotalPages(0);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [formRequest, currentPage]);

	return {
		isError,
		isNotFound,
		isLoading,

		currentPage,
		totalPages,

		students,
		formRequest,

		setIsLoading,
		setCurrentPage,
		setFormRequest,
	};
};

export default useYearBook;
