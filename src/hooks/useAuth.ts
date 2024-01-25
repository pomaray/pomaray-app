import { create } from "zustand";
import axios from "axios";
import { User } from "@/types/user";

export type AuthStore = {
	token?: string;
	user?: User;
	loading: boolean;
	authenticateUser: (username: string, password: string) => Promise<boolean>;
	checkToken: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: undefined,
	loading: false,

	authenticateUser: async (username: string, password: string) => {
		try {
			set({ loading: true });

			const response = await axios.post("/api/auth/", {
				username,
				password,
			});

			const { user } = response.data;
			set({ user });
			return true;
		} catch (error) {
			set({ user: undefined });
			console.error("Error de autenticación:", error);
			throw error;
		} finally {
			set({ loading: false });
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
			set({ loading: false });
		}
	},
}));

export default useAuthStore;
