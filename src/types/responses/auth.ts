//----Imports------------------------------------------------------

import { User } from "@/types/general";

//----CONST------------------------------------------------------

export const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT as string;
export const TOKEN_COOKIE = "token";

export const LOGIN_PAGE = "/acceder";

//----Types------------------------------------------------------

export type TokenResponse = {
	user?: User;
};
