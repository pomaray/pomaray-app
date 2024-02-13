//----Imports------------------------------------------------------

import { Session, User } from "@/types/general";

//----Types------------------------------------------------------

export type TokenResponse = {
	user?: User;
};

export type SessionsResponse = {
	sessions?: Session[];
};

export type LoginResponse = {
	user: User;
	token: string;
};
