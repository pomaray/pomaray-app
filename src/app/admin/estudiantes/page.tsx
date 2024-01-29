"use client";

import useYearBook from "@/hooks/useYearBook";
import { AdminStudentTable } from "@/components/admin/student/AdminStudentTable";
import YearBookForm from "@/components/anuario/YearBookForm";
import { Button } from "@nextui-org/react";
import { PlusFilledIcon } from "@nextui-org/shared-icons";

export default function AdminStudents() {
	const {
		students,
		totalPages,
		currentPage,

		setCurrentPage,
		setFormRequest,
	} = useYearBook(12);

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<div className="w-full text-center mx-auto py-6">
				<YearBookForm setFormRequestHandler={setFormRequest} />
			</div>

			<AdminStudentTable
				students={students}
				currentPage={currentPage || 1}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
			/>
		</section>
	);
}
