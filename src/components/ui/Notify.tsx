"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Link } from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";
import i18n from "@/locales/root.json";

export function NavbarNotify({ isClose }: { isClose: boolean }) {
	const [forceCLose, setForceClose] = useState(false);

	const handleClose = () => {
		setForceClose(true);
	};

	const TEXTO = i18n.NAVBAR.NOTIFICATION.TEXT.split("%s");

	useEffect(() => {
		const currentUrl = window.location.href;
		const defaultIgnore = ["/acceder", "/admin", "/not-found"];
		const ignoreUrl = defaultIgnore.concat(i18n.NAVBAR.NOTIFICATION.LINK);
		const shouldIgnore = ignoreUrl.some((url) => currentUrl.includes(url));

		if (shouldIgnore) {
			setForceClose(true);
		}
	}, []);

	return (
		<AnimatePresence mode="wait">
			{!!forceCLose ||
				(!isClose && (
					<motion.div
						initial={{ y: -120 }}
						animate={{ y: 0 }}
						exit={{ y: -50 }}
						transition={{
							duration: 0.2,
							delay: !forceCLose || !isClose ? 0.3 : 0,
						}}
						className="print:hidden relative flex flex-col justify-center w-screen bg-primary dark:text-foreground !text-white py-2 px-12 text-sm sm:text-lg font-medium z-10 shadow-md"
					>
						<span className="text-center text-sm xss:text-tiny">
							{TEXTO[0]}{" "}
							<Link
								className="underline text-white text-sm xss:text-tiny"
								href={i18n.NAVBAR.NOTIFICATION.LINK}
							>
								{i18n.NAVBAR.NOTIFICATION.LINK_TEXT}
							</Link>{" "}
							{TEXTO[1]}
						</span>

						<Button
							aria-label="Cerrar notificacion"
							name="close"
							isIconOnly
							variant="light"
							color="primary"
							className="text-white absolute right-4 mr-0 xss:sm:mr-10 max-h-full rounded-full"
							onClick={handleClose}
						>
							<CloseIcon />
						</Button>
					</motion.div>
				))}
		</AnimatePresence>
	);
}
