import { News } from "../general";

export const NEWS_ENDPOINT = "https://pomaray-api.onrender.com/api/noticias/";

export type NewsReponse = {
	message: string;
	news: News;
};
