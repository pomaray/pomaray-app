// ¡NO TOCAR!
/* eslint-disable react-hooks/exhaustive-deps */
//----Imports---------------------------------------------------

import { useState, useEffect } from "react";
import { NOT_FOUND } from "@/types/responses/codes";
import axios, { AxiosError } from "axios";
import { SESSIONS_URL } from "@/types/request/user";
import { SessionsResponse } from "@/types/responses/auth";
import { Session } from "@/types/general";

//----Functions-------------------------------------------------

export const useSessions = () => {
	// ----States------------------------------------------------

	// ----Response---------------------------------------
	const [isError, setIsError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [sessions, setUsers] = useState<Session[]>([]);

	const fetchData = async () => {
		try {
			// Resetar estados.
			setIsLoading(true);
			setUsers([]);

			// Hacer una petición `GET` a la URL.
			const response = await axios.get<SessionsResponse>(SESSIONS_URL); // Convierte el objeto URL a una cadena antes de usarlo en fetch

			// Extraer datos JSON de la respuesta.
			const { sessions } = response.data;
			if (!sessions) {
				setIsError(true);
				return;
			}

			setUsers(sessions); // Asigna los archivos de la respuesta al estado
		} catch (error) {
			// Manejo de errores si es 404 (Not found) asignar `setIsNotFound`
			// De cualquier manera asignar `setIsError` y total de paginas 0 `setTotalPages`.
			if (error instanceof AxiosError) {
				setIsNotFound(error.code === NOT_FOUND);
				return;
			}
			setIsError(true);
		} finally {
			setIsLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Se declara arriba y se ejecuta aquí por que es asíncrona.
		// Ver mas : https://dev.to/jasmin/how-to-use-async-function-in-useeffect-5efc
		fetchData();
	}, []);

	return {
		isError,
		isNotFound,
		isLoading,
		sessions,
		fetchData,
		setIsLoading,
	};
};

export default useSessions;
