//----Imports---------------------------------------------------

//----CONST-----------------------------------------------------

export const YEAR_QUERY = "year";
export const NAME_QUERY = "name";
export const TECH_QUERY = "tech";
export const LIMIT_QUERY = "limit";
export const SKIP_QUERY = "skip";

export const STUDENTS_URL = "/api/students";
export const STUDENT_ENDPOINT = process.env.STUDENT_ENDPOINT as string;

//----Types-----------------------------------------------------
export type StudentRequest = {
	name?: string;
	years?: Array<number>;
	tech?: string;
};
