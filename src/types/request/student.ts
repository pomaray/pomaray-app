//----Imports---------------------------------------------------

//----CONST-----------------------------------------------------

export const YEAR_QUERY = "year";
export const NAME_QUERY = "name";
export const TECH_QUERY = "tech";
export const LIMIT_QUERY = "limit";
export const SKIP_QUERY = "skip";

export const STUDENTS_URL = "/api/students";

//----Types-----------------------------------------------------
export type StudentRequest = {
	name?: string;
	years?: Array<number>;
	tech?: string;
};
