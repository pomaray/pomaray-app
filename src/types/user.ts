import { Sex, Role } from "@/types/enums";

export type User = {
	id: string;
	display_name: string;
	username: string;
	sex: Sex;
	role: Role;
};
