import { type Student } from "@/types/student";
import { useState, useEffect } from "react";

interface YearBookResponse {
	total: number;
	students: Student[];
}

interface FormRequest {
	studentName?: string;
	studentSchoolYear?: number[];
	studentTech?: string;
}

interface YearBookHook {
	// Data
	limit: number;
	students?: Student[];
	formRequest: FormRequest;

	// Estados (get)
	error?: string;
	currentPage?: number;
	isLoading: boolean;
	totalPages: number;

	// Estados (set)
	setformRequest: React.Dispatch<React.SetStateAction<FormRequest>>;
	setStudents: React.Dispatch<React.SetStateAction<Student[] | undefined>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const useYearBook: () => YearBookHook = () => {
	// Obtener el año actual para utilizarlo como
	// valor predeterminado en la búsqueda.
	const currentYear = new Date().getFullYear();

	// Estados
	const [formRequest, setformRequest] = useState<FormRequest>({
		studentName: "",
		studentSchoolYear: [currentYear - 1, currentYear], // Ej. 2023, 2024
		studentTech: "",
	});
	const [students, setStudents] = useState<Student[]>();
	const [error, setError] = useState<string>("");
	const [currentPage, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [totalPages, setTotalPages] = useState<number>(0);

	const limit = 30; // Limite total de estudiantes por pagina.
	const baseUrl = "/api/students";

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Construir los 'Quey Params'.
				const params = new URLSearchParams();
				if (formRequest.studentName)
					params.set("name", formRequest.studentName);
				if (formRequest.studentSchoolYear)
					params.set("year", formRequest.studentSchoolYear.toString());
				if (formRequest.studentTech)
					params.set("tech", formRequest.studentTech);

				// Calcular cuantos estudiantes se debe saltar segun la pagina currente.
				// Ej. si currentPage es 1 (la primera página) y limit es 10,
				// entonces skip sería 0, lo que significa que no se omite ningún
				// estudiante porque estamos en la primera página.
				const skip = (currentPage - 1) * limit;

				const url = `${baseUrl}?${params.toString()}&limit=${limit}&skip=${skip}`;
				const response = await fetch(url);

				if (!response.ok) {
					setError("Hubo un error, por favor intentelo de nuevo.");
					return;
				}
				const { total, students } = (await response.json()) as YearBookResponse;

				// Colocar estado deacuerdo a la respuesta.
				setTotalPages(Math.ceil(total / limit));
				setStudents(students);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
					return;
				}

				setTotalPages(0);
				setError("Hubo un error, por favor intentelo de nuevo.");
			} finally {
				// Si hubo un error o no, quitar el estado de caraga.
				setIsLoading(false);
			}
		};

		fetchData();
	}, [formRequest, currentPage]);

	return {
		limit,
		formRequest,
		students,
		error,
		currentPage,
		isLoading,
		totalPages,
		setformRequest,
		setStudents,
		setError,
		setPage,
		setIsLoading,
		setTotalPages,
	};
};

export default useYearBook;
