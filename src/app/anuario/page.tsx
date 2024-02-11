"use client";

import { motion } from "framer-motion";
import { Pagination, Spinner } from "@nextui-org/react";
import { RneModal } from "@/components/RneModal";
import { Title } from "@/components/ui/Title";
import { YearBookActions } from "@/components/anuario/YearBookActions";
import { YearBookStudent } from "@/components/anuario/YearBookStudent";
import i18n from "@/locales/anuario.json";
import useYearBook from "@/hooks/useYearBook";
import YearBookForm from "@/components/anuario/YearBookForm";
import YearBookNotFound from "@/components/anuario/YearBookNotFound";
import { useEffect } from "react";

export default function YearBook() {
	const {
		limit,
		students,
		isLoading,
		isError,

		currentPage,
		totalPages,

		fetchData,
		setCurrentPage,
	} = useYearBook();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				className="max-w-6xl w-full text-center mx-auto xl:px-2 md:px-32 min-h-[10vh]"
			>
				<Title text={i18n.TITLE} withLine />
				<p>{i18n.TIP}</p>{" "}
				{isLoading && (
					<div className="sm:hidden opacity-40">
						<Spinner /> {i18n.FORM.LOADING_MOBILE}
					</div>
				)}
				<YearBookForm />
				<YearBookActions />
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
				className="grid place-content-center min-h-[75vh]"
			>
				{isError ? (
					<YearBookNotFound />
				) : (
					<div className="grid xs:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 sm:grid-cols-3 gap-4 sm:px-2 pb-20 mx-w-6xl mx-auto">
						{Array.from(
							{ length: students.length > 0 ? students.length : limit },
							(_, index) => {
								const student = students[index] ?? null;
								return (
									<YearBookStudent
										key={student?.id || index}
										student={student}
									/>
								);
							},
						)}
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

			<RneModal />
		</main>
	);
}
