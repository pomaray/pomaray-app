"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon, MailIcon } from "@nextui-org/shared-icons";
import LOCALE from "@/locales/root.json";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, theme, setTheme } = useTheme();
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="flex gap-x-2 sm:justify-end w-full">
			<button
				type="button"
				className="dark:hover:bg-neutral-700 hover:bg-slate-500 transition-colors p-2 text-xl rounded-xl"
				onClick={() => {
					setTheme(resolvedTheme === "light" ? "dark" : "light");
				}}
			>
				{theme === "light" ? <MoonIcon /> : <SunIcon />}
			</button>
			<button
				type="button"
				className="dark:hover:bg-neutral-700 hover:bg-slate-500 transition-colors p-2 text-xl rounded-xl"
			>
				<a href={`mailto:${LOCALE.SITIO_WEB.CORREO}`}>
					<MailIcon />
				</a>
			</button>
		</div>
	);
}
