"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Componente proveedor para los componentes de NextUI.
 * Para lograr la mejor funcionalidad, colóquelo en el Layout root como se muestra en el ejemplo.
 *
 * ```tsx
 * export default function RootLayout({
 *   children,
 * }: {
 *   children: React.ReactNode;
 * }) {
 *   return (
 *     <html lang="en">
 *       <UIProviders>
 *         {children}
 *       </UIProviders>
 *     </html>
 *   );
 * }
 * ```
 **/
function UIProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextThemesProvider attribute="class" defaultTheme="dark">
			<NextUIProvider>{children}</NextUIProvider>
		</NextThemesProvider>
	);
}

export default UIProviders;
