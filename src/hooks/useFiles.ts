// ¡NO TOCAR!
/* eslint-disable react-hooks/exhaustive-deps */
//----Imports---------------------------------------------------

import { useState, useEffect } from "react";
import { File } from "@/types/general";
import { NOT_FOUND } from "@/types/responses/codes";
import { AxiosError } from "axios";

//----Functions-------------------------------------------------

export const useFiles = () => {
	// ----States------------------------------------------------

	// ----Response---------------------------------------
	const [isError, setIsError] = useState(false);
	const [isNotFound, setIsNotFound] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const fetchData = async () => {
		try {
			// Restablecer estados.
			setIsLoading(true);
			setIsError(false);
			setIsNotFound(false);
			setFiles([]);

			// Hacer una petición `GET` a la URL.
			const response = await fetch("/api/files"); // Convierte el objeto URL a una cadena antes de usarlo en fetch
			// Si la respuesta no es OK (códigos HTTP 200) hubo algún error.
			if (!response.ok) {
				setIsError(true);
				return;
			}

			// Extraer datos JSON de la respuesta.
			const data = (await response.json()) as File[];
			if (!data || data.length <= 0) {
				setIsNotFound(true);
				setIsError(true);
				return;
			}
			setFiles(data); // Asigna los archivos de la respuesta al estado
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
		files,

		fetchData,
		setIsLoading,
	};
};

export default useFiles;
