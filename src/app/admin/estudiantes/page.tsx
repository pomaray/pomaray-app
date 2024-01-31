"use client";

import useYearBook from "@/hooks/useYearBook";
import useAuthStore from "@/hooks/useAuth";
import { AdminStudentTable } from "@/components/admin/student/AdminStudentTable";
import YearBookForm from "@/components/anuario/YearBookForm";
import { AdminStudentModal } from "@/components/admin/student/AdminStudentModal";
import { Button, Tooltip } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";

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
		fetchData,
	} = useYearBook(12);
	const { user } = useAuthStore();

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<div className="w-full text-center mx-auto py-6">
				<YearBookForm
					isLoading={isLoading}
					setFormRequestHandler={setFormRequest}
				/>
			</div>
			<div className="flex gap-2">
				<AdminStudentModal onClose={fetchData} />
				<Tooltip content="Volver a cargar" color="primary">
					<Button
						isDisabled={(user?.role && user.role < 1) || isLoading}
						variant="solid"
						isIconOnly
						className="hover:opacity-100 opacity-70 transition-opacity"
						onPress={fetchData}
					>
						<SearchIcon />
					</Button>
				</Tooltip>
			</div>

			<AdminStudentTable
				students={students}
				currentPage={currentPage || 1}
				totalPages={totalPages}
				setCurrentPage={setCurrentPage}
				isNotFound={isNotFound}
				isError={isError}
				isLoading={isLoading}
				fetchData={fetchData}
			/>
		</section>
	);
}
