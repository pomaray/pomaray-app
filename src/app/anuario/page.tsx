"use client";

import LOCALE from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import YearBookForm from "@/components/anuario/YearBookForm";

import { SectionTitle } from "@/components/ui/Section";
import { Card, Pagination, Spinner } from "@nextui-org/react";

export default function YearBook() {
	const {
		students,

		isError,
		isNotFound,
		isLoading,

		currentPage,
		totalPages,
		setCurrentPage,
	} = useYearBook();
	return (
		<main className="flex flex-col gap-y-6 justify-center items-center min-h-screen max-w-5xl mx-auto">
			<section className="w-full text-center">
				<SectionTitle text={LOCALE.TITULO} withLine />
				<p>{LOCALE.TIP}</p>
			</section>

			<section className="w-full">
				<YearBookForm />
			</section>

			<section
				className={`min-h-[70vh] 2xl:px-32 ${
					(isLoading || isError) && "grid place-content-center"
				} `}
			>
				{isLoading && <Spinner label="Cargando estudiantes..." />}
			</section>

			<section className="flex justify-center py-10">
				<Pagination
					isDisabled={isLoading}
					size="lg"
					initialPage={currentPage}
					total={totalPages}
					onChange={(page) => setCurrentPage(page)}
					page={currentPage}
				/>
			</section>
		</main>
	);
}
