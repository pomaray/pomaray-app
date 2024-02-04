"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, MailIcon } from "@nextui-org/shared-icons";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/react";
import i18n from "@/locales/root.json";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, theme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex gap-x-2 sm:justify-end w-ful">
			<Tooltip
				shouldCloseOnInteractOutside={(element: Element) => {
					console.log(element);
					return true;
				}}
				content={`Cambiar a modo ${
					resolvedTheme === "light" ? "oscuro" : "claro"
				}`}
			>
				<Button
					aria-label="Cambiar a modo"
					name="Tema"
					variant="light"
					isIconOnly
					className="dark:hover:bg-neutral-700 hover:bg-slate-500 transition-colors p-2 text-xl rounded-xl"
					onClick={() => {
						setTheme(resolvedTheme === "light" ? "dark" : "light");
					}}
				>
					{theme === "light" ? (
						<MoonIcon className="text-white" />
					) : (
						<SunIcon className="text-white" />
					)}
				</Button>
			</Tooltip>
			<Tooltip content="Correo de soporte">
				<Button
					aria-label="Contactar al correo de soporte"
					name="Correo"
					variant="light"
					isIconOnly
					className="dark:hover:bg-neutral-700 hover:bg-slate-500 transition-colors p-2 text-xl rounded-xl"
				>
					<a
						aria-label="Enviar un correo al equipo de soporte"
						href={`mailto:${i18n.WEBSITE.MAIL}`}
					>
						<MailIcon className="text-white" />
					</a>
				</Button>
			</Tooltip>
		</div>
	);
}
