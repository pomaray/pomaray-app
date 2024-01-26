import { Sex } from "@/types/enums";

export type Student = {
	id: string;
	singerd_id: number;
	photo_url: string;
	first_name: string;
	last_name: string;
	sex: Sex;
	school_years: number[];
	current_technique: string;
};
