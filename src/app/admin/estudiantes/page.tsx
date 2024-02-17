"use client";

import useYearBook from "@/hooks/useYearBook";
import useAuthStore from "@/hooks/useAuth";
import { AdminStudentTable } from "@/components/admin/student/AdminStudentTable";
import YearBookForm from "@/components/anuario/YearBookForm";
import { AdminStudentModal } from "@/components/admin/student/AdminStudentModal";
import { Button, Tooltip } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import { YearBookActions } from "@/components/anuario/YearBookActions";
import { useEffect } from "react";

export default function AdminStudents() {
	const { isLoading, fetchData, currentPage } = useYearBook();
	const { user } = useAuthStore();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<div className="w-full text-center mx-auto py-6">
				<YearBookForm />
				<YearBookActions />
			</div>
			<div className="flex gap-2">
				<AdminStudentModal onClose={fetchData} />
				<Tooltip content="Volver a cargar" color="primary">
					<Button
						isDisabled={(user?.role && user.role < 1) || isLoading}
						variant="solid"
						isIconOnly
						className="hover:opacity-100 opacity-70 transition-opacity"
						onPress={() => {
							fetchData();
						}}
					>
						<SearchIcon />
					</Button>
				</Tooltip>
			</div>

			<AdminStudentTable />
		</section>
	);
}
