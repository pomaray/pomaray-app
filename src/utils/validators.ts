import { Student } from "@/types/general";

export const validateStudent = (student: Student): string | null => {
	// Validaciones adicionales
	if (
		student.sigerd_id <= 0 ||
		student.photo_url.trim() === "" ||
		student.first_name.trim() === "" ||
		student.last_name.trim() === "" ||
		student.school_years.length === 0
	) {
		return "Por favor, completa todos los campos correctamente.";
	}

	// Validaciones específicas de longitud usando las restricciones de Pydantic
	if (
		student.first_name.length < 2 ||
		student.first_name.length > 64 ||
		student.last_name.length < 2 ||
		student.last_name.length > 64
	) {
		return "La longitud de los nombres y apellidos debe estar entre 2 y 64 caracteres.";
	}

	// Otras validaciones según sea necesario

	// Si no hay problemas de validación, devuelve null
	return null;
};
