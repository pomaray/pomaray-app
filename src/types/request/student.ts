//----Imports---------------------------------------------------

//----CONST-----------------------------------------------------

export const YEAR_QUERY = "years";
export const FIRST_NAME_QUERY = "first_name";
export const LAST_NAME_QUERY = "last_name";
export const TECH_QUERY = "tecnique";
export const LIMIT_QUERY = "limit";
export const SKIP_QUERY = "skip";

export const STUDENTS_URL = "http://localhost:8000/api/estudiantes";
export const STUDENT_ENDPOINT = process.env.STUDENT_ENDPOINT as string;

export const RNE_URL = "/api/students";
export const RNE_ENDPOINT = process.env.STUDENT_ENDPOINT as string;
export const RNE_STORAGE_KEY = "rne";

//----Types-----------------------------------------------------
export type StudentRequest = {
	first_name?: string;
	last_name?: string;
	years?: Array<number>;
	tech?: string;
};

export type RneRequest = {
	first_name?: string;
	last_name?: string;
	birth_date?: string;
};
