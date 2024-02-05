import axios from "axios";
import { create } from "zustand";
import { type Student } from "@/types/general";
import {
	type RneRequest,
	RNE_URL,
	RNE_STORAGE_KEY,
} from "@/types/request/student";
import { type RneResponse } from "@/types/responses/student";

export interface RNEStore {
	rne?: string;
	isLoading: boolean;
	isError: boolean;

	getRne: (request: RneRequest) => Promise<string | undefined>;
	getStudentByRne: () => Promise<Student | undefined>;
}

export const useRne = create<RNEStore>((set) => ({
	rne: undefined,
	isLoading: false,
	isError: false,

	getRne: async (request) => {
		try {
			set({ isLoading: true, isError: false });
			const localRne = sessionStorage.getItem(RNE_STORAGE_KEY);

			if (localRne) {
				set({ rne: localRne, isLoading: false }); // Corregir isLoading
				return localRne;
			}

			const response = await axios.post<RneResponse>(
				RNE_URL,
				{
					first_name: request.first_name,
					last_name: request.last_name,
					birth_date: request.birth_date,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			const { rne } = response.data;
			sessionStorage.setItem(RNE_STORAGE_KEY, rne);
			return rne;
		} catch (err) {
			set({ isError: true, rne: undefined, isLoading: false });
		} finally {
			set({ isLoading: false });
		}
	},
	getStudentByRne: async () => {
		// Agregar implementación para obtener estudiante por RNE si es necesario
		return undefined;
	},
}));
