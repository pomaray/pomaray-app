"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function NProgressProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ProgressBar
				color="#397040"
				height="3px"
				options={{
					showSpinner: false,
				}}
				shallowRouting
			/>
			{children}
		</>
	);
}

export default NProgressProvider;
