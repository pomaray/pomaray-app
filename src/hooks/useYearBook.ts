// ¡NO TOCAR!
/* eslint-disable react-hooks/exhaustive-deps */
//----Imports---------------------------------------------------

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { type Student } from "@/types/general";
import {
	TECH_QUERY,
	type StudentRequest,
	NAME_QUERY,
	YEAR_QUERY,
	LIMIT_QUERY,
	SKIP_QUERY,
	STUDENTS_URL,
} from "@/types/request/student";
import { StudentsResponse } from "@/types/responses/student";
import { NOT_FOUND } from "@/types/responses/codes";

//----Functions-------------------------------------------------

export const useYearBook = (_limit: number) => {
	const defaultLimit = _limit < 1 || _limit > 50 ? 30 : _limit;

	// ----States------------------------------------------------

	// ----API--------------------------------------------
	const [isError, setIsError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// ----Pagination-------------------------------------
	const [limit, setLimit] = useState(defaultLimit);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// ----Response---------------------------------------
	const [students, setStudents] = useState<Student[]>([]);
	const [formRequest, setFormRequest] = useState<StudentRequest>({
		name: "",
		years: [2024],
		tech: "",
	});
	const [debouncedFormRequest, setDebouncedFormRequest] =
		useState<StudentRequest>(formRequest);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedFormRequest(formRequest);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [formRequest]);

	const fetchData = async () => {
		try {
			// No realiza la solicitud si `isLoading` es true o `debouncedFormRequest` está vacío.
			if (isLoading || !debouncedFormRequest) return;
			setIsLoading(true);
			setStudents([]);

			// Construir los `Query Params` según `debouncedFormRequest`.
			const params = new URLSearchParams();
			if (debouncedFormRequest.name)
				params.set(NAME_QUERY, debouncedFormRequest.name);
			if (debouncedFormRequest.tech)
				params.set(TECH_QUERY, debouncedFormRequest.tech);
			if (debouncedFormRequest.years)
				params.set(YEAR_QUERY, debouncedFormRequest.years.toString());

			// Construir la URL con los `Query Params` el `limit` y `skip`.
			// Ej. /api/students?name=JohnDoe&limit=10&skip=0
			const skip = (currentPage - 1) * limit;
			const url = `${STUDENTS_URL}?${params.toString()}&${LIMIT_QUERY}=${limit}&${SKIP_QUERY}=${skip}`;

			// Hacer una petición `GET` a la URL.
			const response = await axios.get<StudentsResponse>(url);

			// Obtener datos de la respuesta.
			const { total, students } = response.data;
			if (!students || students.length < 1 || total < 1) {
				// Si la cantidad de estudiantes es < 1 o el total < 1 hay un error.
				setIsNotFound(true);
				setIsError(true);
				return;
			}

			// Asignar `setStudents` y total de paginas `setTotalPages`.
			setTotalPages(Math.ceil(total / limit));
			setStudents(students);
		} catch (error) {
			console.log(error);

			// Manejo de errores si es 404 (Not found) asignar `setIsNotFound`
			// De cualquier manera asignar `setIsError` y total de paginas 0 `setTotalPages`.
			if (error instanceof AxiosError) {
				setIsNotFound(error.status === Number(NOT_FOUND));
			}

			setTotalPages(0);
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	// ¡NO TOCAR!
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Se declara arriba y se ejecuta aquí por que es asíncrona.
		// Ver mas : https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc
		fetchData();
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
		fetchData,
	};
};

export default useYearBook;
