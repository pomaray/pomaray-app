"use client";
import LOCALE from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import {
	Input,
	Autocomplete,
	AutocompleteItem,
	Button,
} from "@nextui-org/react";
import { Tech } from "@/types/enums";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { type FormRequest } from "@/hooks/useYearBook";

export default function YearBookForm({
	setFormRequestHandler,
}: {
	setFormRequestHandler: Dispatch<SetStateAction<FormRequest>>;
}) {
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
	};

	return (
		<form
			className="grid-cols-1 sm:grid-cols-3 grid gap-4 -z-50"
			onSubmit={onSubmit}
		>
			<Input
				size="sm"
				name="studentName"
				label={LOCALE.FORMULARIO.NOMBRE}
				onChange={(e) =>
					setFormRequestHandler((prev) => ({
						...prev,
						studentName: e.target.value,
					}))
				}
			/>
			<Autocomplete
				size="sm"
				name="studentTech"
				label={LOCALE.FORMULARIO.TECNICA}
				defaultItems={techItems}
				onSelectionChange={(key) =>
					key &&
					setFormRequestHandler((prev) => ({
						...prev,
						studentTech: key.toString(),
					}))
				}
			>
				{(tecnique) => (
					<AutocompleteItem key={tecnique.key}>
						{tecnique.value}
					</AutocompleteItem>
				)}
			</Autocomplete>
			<Autocomplete
				size="sm"
				name="tecnique"
				label={LOCALE.FORMULARIO.PERIODO}
				defaultItems={getYears()}
				onSelectionChange={(key) =>
					setFormRequestHandler((prev) => ({
						...prev,
						studentSchoolYear: key
							? key
									.toString()
									.split("-")
									.map((value) => Number(value))
							: [],
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
