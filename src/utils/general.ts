//----Imports------------------------------------------------------
import { type CustomIterable } from "@/types/custom";

//----CONST-------------------------------------------------------
export const MIN_YEAR = 2000;
export const TOKEN_EXPIRE_DAYS = 15;
export type Colors = "primary" | "secondary" | "danger" | "warning" | "success";

//----Functions----------------------------------------------------

//----Years----------------------------
export const getYears: () => number[] = () => {
	const currentYear: number = new Date().getFullYear();
	const yearsArray: number[] = [];

	for (let year = MIN_YEAR; year <= currentYear; year++) {
		yearsArray.push(year);
	}

	return yearsArray;
};

export const yearsToIterable: (years: number[]) => CustomIterable[] = (
	years,
) => {
	return years.map((year) => {
		return { key: year, value: year };
	});
};
