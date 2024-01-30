"use client";

import useYearBook from "@/hooks/useYearBook";
import { AdminStudentTable } from "@/components/admin/student/AdminStudentTable";
import YearBookForm from "@/components/anuario/YearBookForm";

export default function AdminStudents() {
	const {
		students,
		totalPages,
		currentPage,
		isNotFound,
		isError,
		isLoading,
		setCurrentPage,
		setFormRequest,
	} = useYearBook(12);

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<div className="w-full text-center mx-auto py-6">
				<YearBookForm
					isLoading={isLoading}
					setFormRequestHandler={setFormRequest}
				/>
			</div>

			<AdminStudentTable
				students={students}
				currentPage={currentPage || 1}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				isNotFound={isNotFound ?? false}
				isError={isError}
				isLoading={isLoading}
			/>
		</section>
	);
}
