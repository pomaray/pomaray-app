//----Imports------------------------------------------------------

import { User } from "@/types/general";

//----Types------------------------------------------------------

export type TokenResponse = {
	user?: User;
};

export type LoginResponse = {
	user: User;
};
