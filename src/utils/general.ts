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

//----Date----------------------------
export function formatDate(date: Date): string {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};

	return new Intl.DateTimeFormat("es-ES", options).format(date);
}

//----Files----------------------------
export function formatSize(sizeInBytes: number): string {
	const kiloByte = 1024;
	const megaByte = kiloByte * kiloByte;
	const gigaByte = megaByte * kiloByte;
	const teraByte = gigaByte * kiloByte;

	if (sizeInBytes < kiloByte) {
		return `${sizeInBytes} B`;
	}
	if (sizeInBytes < megaByte) {
		return `${(sizeInBytes / kiloByte).toFixed(2)} KB`;
	}
	if (sizeInBytes < gigaByte) {
		return `${(sizeInBytes / megaByte).toFixed(2)} MB`;
	}
	if (sizeInBytes < teraByte) {
		return `${(sizeInBytes / gigaByte).toFixed(2)} GB`;
	}
	return `${(sizeInBytes / teraByte).toFixed(2)} TB`;
}
