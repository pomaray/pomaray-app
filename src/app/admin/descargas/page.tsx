"use client";

import { AdminDowloadsTable } from "@/components/admin/dowloads/AdminDowloadsTable";
import useAuthStore from "@/hooks/useAuth";

export default function AdminStudents() {
	const { user } = useAuthStore();

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<AdminDowloadsTable forceLoaing={!user} />
		</section>
	);
}
