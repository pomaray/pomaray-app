import { create } from "zustand";
import { User } from "@/types/general";
import i18n from "@/locales/acceder.json";
import axios, { AxiosError } from "axios";

interface ErrorCodes {
	"404": string;
	"401": string;
	"500": string;
}

export interface AuthenticateRequest {
	username: string;
	password: string;
}

interface AuthResponse {
	user?: User;
	code?: string;
}

export interface AuthStore {
	usernameMinLength: number;
	passwordMinLength: number;

	isLoading: boolean;

	error?: string;
	user?: User;

	authenticateUser: (request: AuthenticateRequest) => Promise<User | undefined>;
	setError: (error: string) => void;
	getUserByToken: () => Promise<User | undefined>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	usernameMinLength: 2,
	passwordMinLength: 8,
	user: undefined,
	isLoading: false,
	error: undefined,

	authenticateUser: async (request: AuthenticateRequest) => {
		try {
			set({ isLoading: true, error: undefined });

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

			const { user } = response.data as AuthResponse;

			if (!user) {
				set({ error: i18n.ERRORS.CODES["500"] });
				return undefined;
			}

			set({ user });
			return user;
		} catch (err) {
			const error = err as AxiosError;
			if (error.response) {
				const errorStatus =
					error.response.status.toString() as keyof ErrorCodes;
				set({
					user: undefined,
					error: i18n.ERRORS.CODES[errorStatus] || i18n.ERRORS.CODES["500"],
				});
			} else {
				set({
					user: undefined,
					error: i18n.ERRORS.CODES["500"],
				});
			}
		} finally {
			set({ isLoading: false });
		}
	},

	getUserByToken: async () => {
		try {
			set({ isLoading: true, error: undefined });

			const response = await fetch("/api/auth");

			const { user } = (await response.json()) as AuthResponse;

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
