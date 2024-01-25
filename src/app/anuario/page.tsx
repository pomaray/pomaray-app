"use client";
import LOCALE from "@/locales/tecnicas.json";

import useYearBook from "@/hooks/useYearBook";

import { YearkBookInput } from "@/components/anuario/YearBookInput";
import { Section, SectionTitle } from "@/components/ui/Section";
import { Tech } from "@/types/tech";
import { Card, Pagination, Spinner } from "@nextui-org/react";

export default function YearBook() {
	const {
		formRequest,
		students,
		currentPage,
		totalPages,
		error,
		isLoading,

		setformRequest,
		setPage,
	} = useYearBook();
	return (
		<main className="min-h-screen">
			<Section className="flex flex-col justify-center items-center">
				<SectionTitle text="Encuentra tu foto de anuario" withLine />
				<p>
					Filtra y encuentra tu foto de anuario fácilmente. Puedes Utilizar los
					filtros para buscar.
				</p>
			</Section>

			<Section className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-4 2xl:px-[20rem] sm:px-20 px-6 py-20">
				<YearkBookInput
					label="Nombre del estudiante"
					values={LOCALE.TECNICAS.map((tech) => {
						return Tech[tech.ID as keyof typeof Tech];
					})}
					onChange={(e) => {
						setformRequest((prev) => ({
							...prev,
							studentTech: e,
						}));
					}}
				/>

				<YearkBookInput
					label="Tecnica del estudiante"
					values={LOCALE.TECNICAS.map((tech) => {
						return Tech[tech.ID as keyof typeof Tech];
					})}
					onChange={(e) => {
						setformRequest((prev) => ({
							...prev,
							studentTech: e,
						}));
					}}
				/>
				<YearkBookInput
					label="Periodo escolar"
					values={LOCALE.TECNICAS.map((tech) => {
						return Tech[tech.ID as keyof typeof Tech];
					})}
					onChange={(e) => {
						setformRequest((prev) => ({
							...prev,
							studentTech: e,
						}));
					}}
				/>
			</Section>

			<Section
				className={`min-h-[70vh] 2xl:px-32 ${
					(isLoading || error) && "grid place-content-center"
				} `}
			>
				{!isLoading && !error ? (
					<div className="grid grid-cols-1 xxs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 gap-4 sm:px-2 px-4 pb-20">
						{Array.from({ length: students?.length || 30 }, (_, index) => {
							const student = students ? students[index] : null;
							return <div>{student?.first_name}</div>;
						})}
					</div>
				) : error ? (
					<Card className="p-6 bg-transparent shadow-none text-danger sm:text-start text-center">
						<p>{error}</p>
					</Card>
				) : (
					<Spinner label="Cargando..." />
				)}
			</Section>

			<Section className="flex justify-center py-10">
				<Pagination
					isDisabled={isLoading}
					size="lg"
					initialPage={currentPage}
					total={totalPages}
					onChange={(page) => setPage(page)}
					page={currentPage}
				/>
			</Section>
		</main>
	);
}
