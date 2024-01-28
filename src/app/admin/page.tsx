"use client";

import useAuthStore from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
	const { user, checkToken } = useAuthStore();
	const router = useRouter();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetch = async () => {
			const user = await checkToken();
			if (!user) {
				router.push("/acceder");
				return;
			}
			console.log(user);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkToken]);

	return (
		<main className="min-h-screen">
			<section>
				<h1>Bienvendio: {user?.display_name}</h1>
			</section>
		</main>
	);
}
