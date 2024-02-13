"use client";

import useAuthStore from "@/hooks/useAuth";
import useSessions from "@/hooks/useSessions";
import { AdminSessionTable } from "@/components/admin/session/AdminSessionTable";

export default function AdminStudents() {
	const { isLoading, fetchData, sessions, isNotFound, isError } = useSessions();
	const { user } = useAuthStore();

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<AdminSessionTable
				isLoading={isLoading}
				fetchData={fetchData}
				sessions={sessions}
				isNotFound={isNotFound}
				isError={isError}
			/>
		</section>
	);
}
