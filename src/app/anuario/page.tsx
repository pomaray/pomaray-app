"use client";

import LOCALE from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import YearBookForm from "@/components/anuario/YearBookForm";

import { SectionTitle } from "@/components/ui/Section";
import { Pagination, Spinner } from "@nextui-org/react";
import { YearBookStudent } from "@/components/anuario/YearBookStudent";

export default function YearBook() {
	const {
		students,
		isLoading,

		currentPage,
		totalPages,

		setFormRequest,
		setCurrentPage,
	} = useYearBook();
	return (
		<main className="flex flex-col gap-y-6 min-h-screen w-screen px-6 max-w-screen overflow-x-hidden">
			<section className="w-full text-center max-w-5xl mx-auto">
				<SectionTitle text={LOCALE.TITULO} withLine />
				<p>{LOCALE.TIP}</p>
			</section>

			<section className="w-full text-center max-w-5xl mx-auto py-6 md:px-20">
				<YearBookForm setFormRequestHandler={setFormRequest} />
			</section>

			<section className="grid xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 gap-4 sm:px-2 pb-20 mx-w-6xl mx-auto">
				{Array.from({ length: students?.length || 30 }, (_, index) => {
					const student = students?.[index];

					return (
						<YearBookStudent key={student?.id || index} student={student} />
					);
				})}
			</section>

			<section className="flex justify-center py-10">
				<Pagination
					isDisabled={totalPages < 2}
					size="lg"
					total={totalPages < 2 ? 1 : totalPages}
					onChange={(page) => setCurrentPage(page)}
					page={currentPage}
				/>
			</section>
		</main>
	);
}
