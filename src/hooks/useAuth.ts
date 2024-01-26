import axios from "axios";
import { create } from "zustand";
import { User } from "@/types/user";

export interface AuthenticateRequest {
	username: string;
	password: string;
}

export interface AuthStore {
	error?: string;
	isLoading: boolean;

	token?: string;
	user?: User;

	authenticateUser: (request: AuthenticateRequest) => Promise<boolean>;
	checkToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
	user: undefined,
	isLoading: false,
	error: undefined,

	authenticateUser: async (request: AuthenticateRequest) => {
		try {
			set({ isLoading: true });

			const response = await axios.post("/api/auth/", {
				username: request.username,
				password: request.password,
			});

			const { user } = response.data;
			set({ user });
			return true;
		} catch (error) {
			set({ user: undefined });
			console.error("Error de autenticación:", error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},

	checkToken: async () => {
		try {
			const response = await axios.get("/api/auth");

			const { user } = response.data;
			set({ user });
		} catch (error) {
			console.error("Error de autenticación:", error);
			throw error;
		} finally {
			set({ isLoading: false });
		}
	},
}));

export default useAuthStore;
