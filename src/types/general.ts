//----Imports---------------------------------------------------

import { Sex, Role } from "@/types/enums";

//----User------------------------------------------------------
export type User = {
	id?: string;
	display_name: string;
	username: string;
	sex: Sex;
	role: Role;
	[key: string]: string | Sex | Role | undefined;
};

//----File------------------------------------------------------
export type File = {
	name: string;
	type: string;
	size: string;
	date: string;
	[key: string]: string;
};

//----Student---------------------------------------------------
export type Student = {
	id?: string;
	sigerd_id: number;
	photo_url: string;
	first_name: string;
	last_name: string;
	birth_date: string;
	rne?: string;
	sex: Sex;
	school_years: number[];
	current_technique: string;
	[key: string]: string | number | Sex | number[] | Date | undefined;
};

export const NOTIFY_SHOW_KEY = "show_notifiy";
