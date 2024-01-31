//----CONST------------------------------------------------------

export const TOKEN_ENDPOINT = process.env.TOKEN_ENDPOINT as string;
export const TOKEN_COOKIE = "token";

export const LOGIN_ENDPOINT = process.env.LOGIN_ENDPOINT as string;
export const LOGIN_PAGE = "/acceder";
export const LOGIN_URL = "/api/auth/";

//----TYPES------------------------------------------------------

export type LoginRequest = {
	username: string;
	password: string;
};
