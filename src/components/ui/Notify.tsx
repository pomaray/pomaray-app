"use client";
import React, { useEffect, useState } from "react";
import LOCALE from "@/locales/root.json";

import { AnimatePresence, motion } from "framer-motion";
import { Button, Link } from "@nextui-org/react";
import { CloseIcon } from "@nextui-org/shared-icons";

type NavbarNotifyProps = {
	IsClose?: boolean;
};

export function NavbarNotify({ IsClose }: NavbarNotifyProps) {
	const [forceCLose, setForceClose] = useState(false);

	const handleClose = () => {
		setForceClose(true);
	};

	const TEXTO = LOCALE.NAVBAR.NOTIFICACION.TEXTO.split("%s");

	useEffect(() => {
		const currentUrl = window.location.href;
		const defaultIgnore = ["/admin/acceder", "/admin", "/not-found"];
		const ignoreUrl = defaultIgnore.concat(LOCALE.NAVBAR.NOTIFICACION.LINK);
		const shouldIgnore = ignoreUrl.some((url) => currentUrl.includes(url));

		if (shouldIgnore) {
			setForceClose(true);
		}
	}, []);

	return (
		<AnimatePresence mode="wait">
			{!!forceCLose ||
				(!IsClose && (
					<motion.div
						initial={{ y: -80, opacity: 1 }}
						animate={{ y: 0 }}
						exit={{ y: -50 }}
						transition={{
							duration: 0.2,
							delay: !forceCLose || !IsClose ? 0.3 : 0,
						}}
						className="relative flex flex-col justify-center w-screen bg-primary dark:text-foreground !text-white py-2 px-12 text-sm sm:text-lg font-medium z-10 shadow-md"
					>
						<span className="text-center text-sm xss:text-tiny">
							{TEXTO[0]}{" "}
							<Link
								className="underline text-white text-sm xss:text-tiny"
								href={LOCALE.NAVBAR.NOTIFICACION.LINK}
							>
								{LOCALE.NAVBAR.NOTIFICACION.TEXTO_LINK}
							</Link>{" "}
							{TEXTO[1]}
						</span>

						<Button
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
