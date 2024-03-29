//----Imports---------------------------------------------------

import { Student } from "@/types/general";

//----Student---------------------------------------------------

export type StudentsResponse = {
	total: number;
	students: Array<Student>;
};

//----Rne---------------------------------------------------
export type RneResponse = {
	rne: string;
};
