export enum Sex {
	MALE = "Male",
	FEMALE = "Female",
}

export enum Role {
	LECTOR = 0,
	ADMIN = 1,
	SUPER_ADMIN = 2,
}

type Colors = "success" | "secondary";

export const sexColorMap: { [key: string]: Colors } = {
	Male: "success",
	Female: "secondary",
};

export enum Tech {
	DAAI = "Desarrollo y Administración de Aplicaciones Informáticas",
	GAT = "Gestión Administrativa y Tributaria",
	CM = "Comercio y Mercadeo",
	TRO = "Electrónica",
	TRI = "Electricidad",
	RAE = "Refrigeración y Acondicionamiento de Aire",
	GAS = "Gastronomía",
}

export const Roles: { value: keyof typeof Role; key: number }[] =
	Object.entries(Role)
		.filter(([key]) => Number.isNaN(Number(key)))
		.map(([key, value]) => ({
			value: key as keyof typeof Role,
			key: Number(value),
		}));

export const Sexos: { value: keyof typeof Sex; key: string }[] = Object.entries(
	Sex,
)
	.filter(([key]) => Number.isNaN(Number(key)))
	.map(([key, value]) => ({
		value: key as keyof typeof Sex,
		key: value,
	}));

export const Techs: { key: keyof typeof Tech; value: string }[] = Object.keys(
	Tech,
).map((key) => {
	return {
		key: key as keyof typeof Tech,
		value: Tech[key as keyof typeof Tech],
	};
});
