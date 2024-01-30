//----Imports---------------------------------------------------

import { CustomIterable } from "@/types/custom";
import { Role, Sex, Tech } from "@/types/enums";
import Locale from "@/locales/utils/sexo.json";
import { Colors } from "./general";

//----Functions-------------------------------------------------

//----Sex-----------------------------

export const renderSexEnum: (key: Sex) => string = (key) => {
	return key.toUpperCase() === Sex.FEMALE.toUpperCase()
		? Locale.FEMALE
		: Locale.MALE;
};

export const renderSexColor: (key: Sex) => Colors = (key) => {
	return key === Sex.FEMALE ? "secondary" : "primary";
};

export const getSexIterables: () => CustomIterable[] = () => {
	return Object.keys(Sex).map((key) => {
		return {
			key: key as keyof typeof Sex,
			value: Sex[key as keyof typeof Sex],
		};
	});
};

//----Role----------------------------

export const getRoleIterables: () => CustomIterable[] = () => {
	return Object.keys(Role)
		.filter((key) => Number.isNaN(Number(Role[key as keyof typeof Role])))
		.map((key) => {
			return {
				key: key as keyof typeof Role,
				value: Role[key as keyof typeof Role],
			};
		});
};

// Uso de la función
const roles = getRoleIterables();
console.log(roles);

export const renderRoleEnum: (key: Role) => string = (key) => {
	return Role[key].toString().toLowerCase().replaceAll("_", " ");
};

//----Tech----------------------------

export const getTechIterables: () => CustomIterable[] = () => {
	return Object.keys(Tech).map((key) => {
		return {
			key: key as keyof typeof Tech,
			value: Tech[key as keyof typeof Tech],
		};
	});
};
