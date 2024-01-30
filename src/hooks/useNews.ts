import { useEffect, useState } from "react";

interface NewsResponse {
	total: number;
	news: New[];
}

interface New {
	id: string;
	title: string;

	description: string;
	content: string;

	views: number;
	created_at: Date;
}

interface NewsHook {
	lastError?: string;
	error?: string;

	currentPage: number;
	totalPages: number;

	news?: New[];
	lastNew?: New;

	setLastError: React.Dispatch<React.SetStateAction<string>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setNews: React.Dispatch<React.SetStateAction<New[] | undefined>>;
	setLastNew: React.Dispatch<React.SetStateAction<New | undefined>>;
	setTotalPages: React.Dispatch<React.SetStateAction<number>>;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const useNews: () => NewsHook = () => {
	// Estados de errores.
	const [lastError, setLastError] = useState<string>("");
	const [error, setError] = useState<string>("");

	// Estados numericos, utilizado en el paginado.
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);

	// Estados de noticias.
	const [news, setNews] = useState<New[]>();
	const [lastNew, setLastNew] = useState<New>();

	// Configuracion del hook.
	const limit = 30;
	const baseUrl = "/api/news";

	// Obtener la utlima notica.
	useEffect(() => {
		const fetchLastNew = async () => {
			try {
				const url = `${baseUrl}?order=latest&limit=1"`;

				const response = await fetch(url);
				if (!response.ok) {
					setError("Hubo un error, por favor intentelo de nuevo.");
					return;
				}

				const result = (await response.json()) as New;
				setLastNew(result);
			} catch (error) {
				if (error instanceof Error) {
					setLastError(error.message);
					return;
				}
				setLastError("Hubo un error, por favor intentelo de nuevo.");
			}
		};

		fetchLastNew();
	});

	// Obtener noticias.
	useEffect(() => {
		const fetchNews = async () => {
			try {
				const skip = (currentPage - 1) * limit;
				const url = `${baseUrl}?limit=${limit}&skip=${skip}`;

				const response = await fetch(url);
				if (!response.ok) {
					setError("Hubo un error, por favor intentelo de nuevo.");
					return;
				}

				const { news, total } = (await response.json()) as NewsResponse;

				setNews(news);
				setTotalPages(Math.ceil(total / limit));
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
					return;
				}
				setError("Hubo un error, por favor intentelo de nuevo.");
			}
		};

		fetchNews();
	}, [currentPage]);

	return {
		lastError,
		error,

		currentPage,
		totalPages,

		news,
		lastNew,

		setError,
		setLastError,
		setCurrentPage,
		setTotalPages,
		setLastNew,
		setNews,
	};
};

export default useNews;
