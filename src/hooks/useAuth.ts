import { create } from "zustand";
import i18n from "@/locales/acceder.json";
import axios, { AxiosError } from "axios";
import { type LoginResponse } from "@/types/responses/auth";
import { type LoginRequest } from "@/types/request/auth";
import { type User } from "@/types/general";

type i18nCodes = keyof typeof i18n.ERRORS.CODES;

export interface AuthStore {
	usernameMinLength: number;
	passwordMinLength: number;

	isLoading: boolean;
	isSucces: boolean;

	error?: string;
	user?: User;

	authenticateUser: (request: LoginRequest) => Promise<User | undefined>;
	setError: (error: string) => void;
	getUserByToken: () => Promise<User | undefined>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	usernameMinLength: 2,
	passwordMinLength: 8,
	user: undefined,
	isLoading: false,
	isSucces: false,
	error: undefined,

	authenticateUser: async (request: LoginRequest) => {
		try {
			set({ isSucces: false, isLoading: true, error: undefined });

			const response = await axios.post(
				"/api/auth/",
				{
					username: request.username,
					password: request.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const { user } = response.data as LoginResponse;

			if (!user) {
				set({ error: i18n.ERRORS.CODES["500"] });
				return undefined;
			}

			set({ user, isSucces: true });
			return user;
		} catch (err) {
			const error = err as AxiosError;
			if (error.response) {
				const errorStatus = error.response.status.toString() as i18nCodes;
				set({
					user: undefined,
					error: i18n.ERRORS.CODES[errorStatus] || i18n.ERRORS.CODES["500"],
					isSucces: false,
				});
			} else {
				set({
					user: undefined,
					error: i18n.ERRORS.CODES["500"],
					isSucces: false,
				});
			}
		} finally {
			set({ isLoading: false });
		}
	},

	getUserByToken: async () => {
		try {
			set({ isSucces: false, isLoading: true, error: undefined });

			const response = await fetch("/api/auth");

			const { user } = (await response.json()) as LoginResponse;

			set({ user });
			return user;
		} catch (error) {
			set({ user: undefined });
		} finally {
			set({ isLoading: false });
		}
	},

	setError: (error: string) => {
		set({ error: error });
	},
}));

export default useAuthStore;
