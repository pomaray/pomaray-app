"use client";

import useAuthStore from "@/hooks/useAuth";
import { AdminEditUserModal } from "@/components/admin/user/AdminEditUserModal";
import { AdminUserTable } from "@/components/admin/user/AdminUserTable";
import { Button, Tooltip } from "@nextui-org/react";
import { SearchIcon } from "@nextui-org/shared-icons";
import useUsers from "@/hooks/useUsers";

export default function AdminUser() {
	const { isError, isLoading, isNotFound, users, fetchData } = useUsers();
	const { user } = useAuthStore();

	return (
		<section className="min-h-[80vh] pb-12 px-2">
			<div className="flex gap-2">
				<AdminEditUserModal onClose={fetchData} />
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

			<AdminUserTable
				users={users}
				isNotFound={isNotFound}
				isError={isError}
				isLoading={isLoading}
				fetchData={fetchData}
			/>
		</section>
	);
}
