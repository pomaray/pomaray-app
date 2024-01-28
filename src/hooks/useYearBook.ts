"use client";

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

export interface FormRequest {
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
		studentSchoolYear: [],
		studentTech: "",
	});

	const [debouncedFormRequest, setDebouncedFormRequest] =
		useState<FormRequest>(formRequest);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedFormRequest(formRequest);
		}, 500); // Ajusta el tiempo de espera según tus necesidades

		return () => {
			clearTimeout(timerId);
		};
	}, [formRequest]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				if (isLoading || !debouncedFormRequest) return; // No realiza la solicitud si isLoading es true o debouncedFormRequest está vacío
				setIsLoading(true);
				setStudents([]);

				// Construir los *query params* según debouncedFormRequest.
				const params = new URLSearchParams();
				if (debouncedFormRequest.studentName)
					params.set("name", debouncedFormRequest.studentName);
				if (debouncedFormRequest.studentTech)
					params.set("tecnique", debouncedFormRequest.studentTech);
				if (debouncedFormRequest.studentSchoolYear)
					params.set(
						"years",
						debouncedFormRequest.studentSchoolYear.toString(),
					);

				const skip = (currentPage - 1) * limit;
				const url = `${baseUrl}?${params.toString()}&limit=${limit}&skip=${skip}`;

				const response = await fetch(url);
				if (!response.ok) {
					setIsError(true);
					return;
				}

				console.log(response);

				const { total, students } = (await response.json()) as YearBookResponse;
				if (students.length < 1 || total < 1) {
					setIsNotFound(true);
					return;
				}

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedFormRequest, currentPage]);

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
