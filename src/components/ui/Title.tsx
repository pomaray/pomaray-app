import { color } from "framer-motion";
import { twMerge } from "tailwind-merge";

type SectionTitleProps = {
	withLine?: boolean;
	className?: string;
	classNames?: {
		text?: string;
		line?: string;
	};
	text: string | React.ReactNode;
	color?: "primary" | "background" | "foreground";
};

export function Title({
	withLine = true,
	className,
	classNames,
	text,
	color = "primary",
}: SectionTitleProps) {
	return (
		<div className={twMerge("py-10", className)}>
			{typeof text === "object" ? (
				text
			) : (
				<h2
					className={twMerge(
						`text-${classNames?.text}`,
						"relative mx-auto sm:text-4xl text-3xl font-bold w-fit text-balance",
						className,
					)}
				>
					{text}
					{withLine && (
						<span
							className={twMerge(
								`bg-${color}`,
								"block  h-1 mt-2 rounded-lg w-full top-10",
								classNames?.line,
							)}
						/>
					)}
				</h2>
			)}
		</div>
	);
}
