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
	path: string;
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

//----Session---------------------------------------------------
export type Session = {
	id: string;
	ip: string;

	device: string;
	token: string;
	expire: Date;

	user_id: string;
	[key: string]: string | Date | undefined;
};

//----News---------------------------------------------------
export type News = {
	id: string;
	title: string;
	short_description: string;
	content: string;
	views: number;
	post_by: string;
	created_date: Date;
};
