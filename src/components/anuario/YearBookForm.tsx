"use client";
import LOCALE from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Tech } from "@/types/enums";
import { FormEvent } from "react";

export default function YearBookForm() {
	const { isLoading, submit, setFormRequest } = useYearBook();
	const techItems: { key: keyof typeof Tech; value: string }[] = Object.keys(
		Tech,
	).map((key) => {
		return {
			key: key as keyof typeof Tech,
			value: Tech[key as keyof typeof Tech],
		};
	});
	const getYears = (): { key: string; value: string }[] => {
		try {
			const currentYear = new Date().getFullYear();
			let startYear = 2010;

			try {
				startYear = Number(LOCALE.FORMULARIO.MIN_PERIDO);
			} catch (innerError) {
				console.error("Error al obtener el año mínimo:", innerError);
			}

			const yearRange: number[] = Array.from(
				{ length: currentYear - startYear },
				(_, index) => startYear + index,
			);

			const yearItems: { key: string; value: string }[] = [];

			for (let i = 0; i < yearRange.length - 1; i++) {
				const start = yearRange[i];
				const end = start + 1;

				const key = `${start}-${end}`;
				const value = `${start}-${end}`;

				yearItems.push({ key, value });
			}

			// Agregamos el último año, ya que el bucle termina en el penúltimo
			const lastYear = yearRange[yearRange.length - 1];
			yearItems.push({
				key: `${lastYear}-${lastYear + 1}`,
				value: `${lastYear}-${lastYear + 1}`,
			});

			return yearItems;
		} catch (error) {
			console.error("Error al obtener los años:", error);
			return [];
		}
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submit();
	};

	return (
		<form
			className="lg:grid-cols-3 sm:grid-cols-1 grid grid-cols-1 gap-4 -z-50"
			onSubmit={onSubmit}
		>
			<Input
				size="sm"
				name="studentName"
				label={LOCALE.FORMULARIO.NOMBRE}
				isDisabled={isLoading}
				onChange={(e) =>
					setFormRequest((prev) => ({ ...prev, studentName: e.target.value }))
				}
			/>
			<Autocomplete
				size="sm"
				name="studentTech"
				label={LOCALE.FORMULARIO.TECNICA}
				isLoading={isLoading}
				isDisabled={isLoading}
				defaultItems={techItems}
				onSelectionChange={(key) =>
					setFormRequest((prev) => ({ ...prev, studentTech: key?.toString() }))
				}
			>
				{(tech) => (
					<AutocompleteItem key={tech.key}>{tech.value}</AutocompleteItem>
				)}
			</Autocomplete>
			<Autocomplete
				size="sm"
				name="tech"
				label={LOCALE.FORMULARIO.PERIODO}
				isLoading={isLoading}
				isDisabled={isLoading}
				defaultItems={getYears()}
				onSelectionChange={(key) =>
					setFormRequest((prev) => ({
						...prev,
						studentSchoolYear: key
							.toString()
							.split("-")
							.map((value) => Number(value)),
					}))
				}
			>
				{(year) => (
					<AutocompleteItem key={year.key}>{year.value}</AutocompleteItem>
				)}
			</Autocomplete>
		</form>
	);
}
