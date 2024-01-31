//----Sex---------------------------------------------------
/**
Sexos disponibles. ¿Por qué solo existen masculino y femenino?
Recordar que "sexo" no es lo mismo que "género",
puedes ver más en: https://dle.rae.es/sexo.
**/
export enum Sex {
	Male = "Male",
	Female = "Female",
}

//----Role--------------------------------------------------
/**
Enumeración de los roles, mientras mas alto en numero mas poder tiene,
Ejemplo: 0 tiene menos poder que 1. Roles disponibles:

0. LECTOR
1. ADMIN
2. SUPER_ADMIN
**/
export enum Role {
	LECTOR = 0,
	ADMIN = 1,
	SUPER_ADMIN = 2,
}

//----Tech--------------------------------------------------
/** 
Técnicas disponibles.
- DAAI
- GAT
- CM 
- TRO 
- TRI 
- RAE  
- GAS 
**/
export enum Tech {
	DAAI = "Desarrollo y Administración de Aplicaciones Informáticas",
	GAT = "Gestión Administrativa y Tributaria",
	CM = "Comercio y Mercadeo",
	TRO = "Electrónica",
	TRI = "Electricidad",
	RAE = "Refrigeración y Acondicionamiento de Aire",
	GAS = "Gastronomía",
}
