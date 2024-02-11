"use clinet";
import { Student } from "@/types/general";
import {
	FIRST_NAME_QUERY,
	LAST_NAME_QUERY,
	LIMIT_QUERY,
	SKIP_QUERY,
	STUDENTS_URL,
	StudentRequest,
	TECH_QUERY,
	YEAR_QUERY,
} from "@/types/request/student";
import { NOT_AUTHORIZED, NOT_FOUND } from "@/types/responses/codes";
import { StudentsResponse } from "@/types/responses/student";
import axios, { AxiosError } from "axios";
import { create } from "zustand";

// Definir el tipo de estado
type YearBookStore = {
	isError: boolean;
	isNotFound: boolean;
	isNotAuth: boolean;
	isLoading: boolean;
	currentPage: number;
	totalPages: number;
	students: Student[];
	sigerd: number;
	limit: number;
	formRequest: StudentRequest;
	setSigerd: (value: number) => void;
	setLimit: (value: number) => void;
	setIsLoading: (value: boolean) => void;
	setCurrentPage: (value: number) => void;
	setFormRequest: (value: StudentRequest) => void;
	fetchData: (resetPage?: boolean) => void;
};

// Crear el estado global con zustand
const useYearBook = create<YearBookStore>((set, get) => {
	// Verificar si localStorage está disponible
	const isLocalStorageAvailable = typeof localStorage !== "undefined";

	// Obtener el `sigerd` y el `limit` del `localStorage` al iniciar si está disponible
	const storedSigerd = isLocalStorageAvailable
		? localStorage.getItem("sigerd")
		: null;
	const storedLimit = isLocalStorageAvailable
		? localStorage.getItem("limit")
		: null;

	const initialState = {
		isError: false,
		isNotFound: false,
		isNotAuth: false,
		isLoading: false,
		currentPage: 1,
		totalPages: 0,
		students: [],
		sigerd: storedSigerd ? parseInt(storedSigerd, 10) : 0,
		limit: storedLimit ? parseInt(storedLimit, 10) : 30,
		formRequest: {
			first_name: "",
			last_name: "",
			years: [],
			tech: "",
		},
	};

	set(initialState);

	return {
		isError: get().isError,
		isNotFound: get().isNotFound,
		isNotAuth: get().isNotAuth,
		isLoading: get().isLoading,
		currentPage: get().currentPage,
		totalPages: get().totalPages,
		students: get().students,
		sigerd: get().sigerd,
		limit: get().limit,
		formRequest: get().formRequest,

		setSigerd: (value) => {
			localStorage.setItem("sigerd", value.toString());
			set({ sigerd: value });
		},
		setLimit: (value) => {
			localStorage.setItem("limit", value.toString());
			set({ limit: value });
		},
		setIsLoading: (value) => set({ isLoading: value }),
		setCurrentPage: (value) => set({ currentPage: value }),
		setFormRequest: (value) => set({ formRequest: value }),

		fetchData: async (resetPage = false) => {
			try {
				if (get().isLoading || !get().formRequest || get().sigerd < 1) return;
				set({ isLoading: false });
				set({ students: [] });
				set({ isError: false });
				set({ isNotFound: false });
				set({ isNotAuth: false });

				const debouncedFormRequest = get().formRequest;
				const limit = get().limit;
				const currentPage = get().currentPage;

				// Construir los `Query Params` según `debouncedFormRequest`.
				const params = new URLSearchParams();
				if (debouncedFormRequest.first_name)
					params.set(FIRST_NAME_QUERY, debouncedFormRequest.first_name);
				if (debouncedFormRequest.last_name)
					params.set(LAST_NAME_QUERY, debouncedFormRequest.last_name);
				if (debouncedFormRequest.tech)
					params.set(TECH_QUERY, debouncedFormRequest.tech);
				if (debouncedFormRequest.years)
					params.set(YEAR_QUERY, debouncedFormRequest.years.toString());

				// Construir la URL con los `Query Params` el `limit` y `skip`.
				// Ej. /api/students?name=JohnDoe&limit=10&skip=0
				const skip = !resetPage ? (currentPage - 1) * limit : 0;
				const url = `${STUDENTS_URL}?${params}&${LIMIT_QUERY}=${limit}&${SKIP_QUERY}=${skip}`;
				console.log(url);

				// Hacer una petición `GET` a la URL.
				const response = await axios.get<StudentsResponse>(url, {
					headers: {
						Authorization: get().sigerd,
					},
				});

				// Obtener datos de la respuesta.
				const { total, students } = response.data;
				if (!students || students.length < 1 || total < 1) {
					// Si la cantidad de estudiantes es < 1 o el total < 1 hay un error.
					set({ isNotFound: true, isError: false });
					return;
				}

				set({ students, totalPages: Math.ceil(total / limit) });
			} catch (error) {
				// Manejo de errores si es 404 (Not found) asignar `setIsNotFound`
				// De cualquier manera asignar `setIsError` y total de paginas 0 `setTotalPages`.

				if (error instanceof AxiosError) {
					const status = error.response?.status;

					set({
						isNotFound: status === Number(NOT_FOUND),
						isNotAuth: status === Number(NOT_AUTHORIZED),
					});
				}

				set({ isError: true, totalPages: 0 });
				console.log(get());
			} finally {
				set({ isLoading: false });
			}
		},
	};
});

export default useYearBook;
