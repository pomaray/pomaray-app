"use client";

import i18n from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import YearBookForm from "@/components/anuario/YearBookForm";

import { Title } from "@/components/ui/Title";
import { Pagination, Spinner } from "@nextui-org/react";
import { YearBookStudent } from "@/components/anuario/YearBookStudent";
import YearBookNotFound from "@/components/anuario/YearBookNotFound";
import { motion } from "framer-motion";

export default function YearBook() {
	const {
		students,
		isLoading,
		isError,

		currentPage,
		totalPages,

		setFormRequest,
		setCurrentPage,
	} = useYearBook(30);
	return (
		<main className="flex flex-col gap-y-6 min-h-screen w-screen px-6 max-w-screen overflow-x-hidden">
			<motion.section
				initial={{
					translateY: 100,
					opacity: 0,
				}}
				animate={{
					translateY: 0,
					opacity: 1,
				}}
				className="w-full text-center max-w-5xl mx-auto"
			>
				<Title text={i18n.TITLE} withLine />
				<p>{i18n.TIP}</p>
				<YearBookForm
					isLoading={isLoading}
					setFormRequestHandler={setFormRequest}
				/>
			</motion.section>

			<motion.section
				initial={{
					translateY: 100,
					opacity: 0,
				}}
				animate={{
					translateY: 0,
					opacity: 1,
				}}
				className="grid place-content-center min-h-[60vh]"
			>
				{isLoading && !isError ? (
					<Spinner />
				) : isError ? (
					<YearBookNotFound />
				) : (
					<div className="grid xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 gap-4 sm:px-2 pb-20 mx-w-6xl mx-auto">
						{students?.map((student, index) => (
							<YearBookStudent key={student?.id || index} student={student} />
						))}
					</div>
				)}
			</motion.section>

			<section className="flex justify-center pb-10">
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
