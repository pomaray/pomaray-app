import { create } from "zustand";
import { User } from "@/types/user";
import LOCALE from "@/locales/acceder.json";

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

	authenticateUser: (request: AuthenticateRequest) => Promise<void>;
	setError: (error: string) => void;
	checkToken: () => Promise<void>;
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

			const response = await fetch("/api/auth/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: request.username,
					password: request.password,
				}),
			});

			const { user, code } = (await response.json()) as AuthResponse;
			if (code) {
				switch (code) {
					case "404":
						set({
							isLoading: false,
							error: LOCALE.ERRORES[404],
						});
						return;
					case "401":
						set({ isLoading: false, error: LOCALE.ERRORES[401] });
						return;
					default:
						set({ isLoading: false, error: LOCALE.ERRORES[500] });
						return;
				}
			}

			if (!user) {
				set({ error: LOCALE.ERRORES[500] });
				return;
			}

			set({ user });
		} catch (error) {
			set({
				user: undefined,
				error: LOCALE.ERRORES[500],
			});
		} finally {
			set({ isLoading: false });
		}
	},

	checkToken: async () => {
		try {
			set({ isLoading: true, error: undefined });

			const response = await fetch("/api/auth");

			const { user } = (await response.json()) as AuthResponse;
			set({ user });
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
