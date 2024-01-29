import { Sex, Tech } from "@/types/enums";

export type Student = {
	id: string;
	sigerd_id: number;
	photo_url: string;
	first_name: string;
	last_name: string;
	sex: Sex;
	school_years: number[];
	current_technique: string;
	[key: string]: string | number | Sex | number[]; // Firma de índice para propiedades adicionales
};
