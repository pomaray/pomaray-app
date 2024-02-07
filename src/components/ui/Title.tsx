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
	const lineClassName = "block h-1 mt-2 rounded-full max-w-full mx-4 top-10";

	return (
		<div className={twMerge("py-10", className)}>
			{typeof text === "string" ? (
				<h2
					className={twMerge(
						`text-${classNames?.text}`,
						"relative mx-auto sm:text-5xl text-3xl font-bold w-fit text-balance",
						className,
					)}
				>
					{text}
					{withLine && (
						<span
							className={twMerge(
								`bg-${color}`,
								lineClassName,
								classNames?.line,
							)}
						/>
					)}
				</h2>
			) : (
				<div className="w-fit">
					{text}
					{withLine && (
						<span
							className={twMerge(
								`bg-${color}`,
								lineClassName,
								classNames?.line,
							)}
						/>
					)}
				</div>
			)}
		</div>
	);
}
