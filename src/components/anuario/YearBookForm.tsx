"use client";
import i18n from "@/locales/anuario.json";
import { Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { FormEvent } from "react";
import { getTechIterables } from "@/utils/enums";

import { motion } from "framer-motion";
import { getYears, yearsToIterable } from "@/utils/general";
import useYearBook from "@/hooks/useYearBook";

export default function YearBookForm() {
	const { fetchData, isLoading, formRequest, setFormRequest } = useYearBook();

	const years = yearsToIterable(getYears());

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		fetchData();
	};

	return (
		<motion.form
			initial={{
				translateY: 100,
				opacity: 0,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
			className="grid-cols-1 xl:grid-cols-4 sm:grid-cols-2  grid gap-4 -z-50 my-10"
			onSubmit={onSubmit}
		>
			<Input
				size="sm"
				name="name"
				label={i18n.FORM.FIRST_NAME}
				isDisabled={isLoading}
				onChange={(e) =>
					setFormRequest({
						...formRequest,
						first_name: e.target.value,
					})
				}
			/>
			<Input
				size="sm"
				name="name"
				label={i18n.FORM.LAST_NAME}
				isDisabled={isLoading}
				onChange={(e) =>
					setFormRequest({
						...formRequest,
						last_name: e.target.value,
					})
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
					setFormRequest({
						...formRequest,
						tech: key.toString(),
					})
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
				defaultItems={years}
				onSelectionChange={(key) =>
					setFormRequest({
						...formRequest,
						years: key
							? key
									.toString()
									.split("-")
									.map((value) => Number(value))
							: [],
					})
				}
			>
				{(year) => (
					<AutocompleteItem key={year.key}>
						{year.value.toString()}
					</AutocompleteItem>
				)}
			</Autocomplete>
		</motion.form>
	);
}
