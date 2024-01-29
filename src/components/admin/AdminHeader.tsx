"use client";

import useAuthStore from "@/hooks/useAuth";
import { Button, Chip, Skeleton, Tooltip } from "@nextui-org/react";
import { FaRightFromBracket } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminEditUserModal } from "@/components/admin/user/AdminEditUserModal";

export function Header() {
	const { user, getUserByToken } = useAuthStore();
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetch = async () => {
			console.log(user);

			if (!user) {
				const newUser = await getUserByToken();
				if (!newUser) {
					router.push("/acceder");
					return;
				}
			}
		};
		fetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getUserByToken]);

	return (
		<section className="flex sm:flex-row flex-col gap-6 justify-between pb-12 px-6 overflow-hidden">
			<div className="flex flex-col gap-4">
				<Skeleton
					className="rounded-lg w-fit"
					disableAnimation
					isLoaded={!!user}
				>
					<Chip color="primary" variant="bordered">
						Session iniciada como: {user?.username}
					</Chip>
				</Skeleton>
				<Skeleton
					className={`rounded-lg ${!user && "w-96 h-8"}`}
					disableAnimation
					isLoaded={!!user}
				>
					<h1 className="font-normal text-3xl">
						Bienvenido{" "}
						<span className="font-bold text-4xl">{user?.display_name}</span>
					</h1>
				</Skeleton>
			</div>
			<div className="flex gap-4 items-end">
				<AdminEditUserModal editUser={user} />
				<Tooltip content="Cerrar session" color="primary">
					<Button isIconOnly color="primary" variant="bordered">
						<FaRightFromBracket className="text-lg" />
					</Button>
				</Tooltip>
			</div>
		</section>
	);
}
