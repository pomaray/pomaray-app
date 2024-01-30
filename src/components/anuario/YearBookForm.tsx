"use client";
import i18n from "@/locales/anuario.json";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { getTechIterables } from "@/utils/enums";
import { StudentRequest } from "@/types/request/student";

export default function YearBookForm({
	setFormRequestHandler,
	isLoading = false,
}: {
	isLoading: boolean;
	setFormRequestHandler: Dispatch<SetStateAction<StudentRequest>>;
}) {
	const getYears = (): { key: string; value: string }[] => {
		try {
			const currentYear = new Date().getFullYear();
			let startYear = 2010;

			try {
				startYear = Number(i18n.FORM.MIN_PERIOD);
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
				name="name"
				label={i18n.FORM.NAME}
				isDisabled={isLoading}
				onChange={(e) =>
					setFormRequestHandler((prev) => ({
						...prev,
						studentName: e.target.value,
					}))
				}
			/>
			<Autocomplete
				size="sm"
				name="tech"
				label={i18n.FORM.TECH}
				isDisabled={isLoading}
				defaultItems={getTechIterables()}
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
				name="years"
				isDisabled={isLoading}
				label={i18n.FORM.PERIOD}
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
