// ¡NO TOCAR!
/* eslint-disable react-hooks/exhaustive-deps */
//----Imports---------------------------------------------------

import { useState, useEffect } from "react";
import { type User } from "@/types/general";
import { NOT_FOUND } from "@/types/responses/codes";
import axios, { AxiosError } from "axios";
import { USERS_URL } from "@/types/request/user";
import { UsersResponse } from "@/types/responses/user";

//----Functions-------------------------------------------------

export const useUsers = () => {
	// ----States------------------------------------------------

	// ----Response---------------------------------------
	const [isError, setIsError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState<User[]>([]);

	const fetchData = async () => {
		try {
			// Resetar estados.
			setIsLoading(true);
			setUsers([]);

			// Hacer una petición `GET` a la URL.
			const response = await axios.get<UsersResponse>(USERS_URL); // Convierte el objeto URL a una cadena antes de usarlo en fetch

			// Extraer datos JSON de la respuesta.
			const { users } = response.data;
			if (!users) {
				setIsError(true);
				return;
			}

			setUsers(users); // Asigna los archivos de la respuesta al estado
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
		users,
		fetchData,
		setIsLoading,
	};
};

export default useUsers;
