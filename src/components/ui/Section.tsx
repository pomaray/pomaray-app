import { color } from "framer-motion";

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

type SectionProps = {
	id?: string;
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
};

export function SectionTitle({
	withLine,
	className,
	classNames,
	text,
	color = "primary",
}: SectionTitleProps) {
	return (
		<div className={`${className ?? ""} py-10`}>
			{typeof text === "object" ? (
				text
			) : (
				<h2
					className={`relative mx-auto sm:text-4xl text-3xl font-bold text-${color} w-fit ${classNames?.text}`}
				>
					{text}
					{withLine && (
						<span
							className={`block bg-${color} h-1 mt-2 rounded-lg w-full top-10 ${classNames?.line}`}
						/>
					)}
				</h2>
			)}
		</div>
	);
}

export function Section({ id, children, className, style }: SectionProps) {
	return (
		<section id={id} className={`relative w-screen ${className}`} style={style}>
			{children}
		</section>
	);
}
