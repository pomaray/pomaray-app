import { twMerge } from "tailwind-merge";

interface ErrorTxtProps {
	className?: string;
	children?: React.ReactNode;
}

export function ErrorTxt({ children, className }: ErrorTxtProps) {
	return (
		<div className={twMerge("text-center", className)}>
			<p className="text-danger">{children}</p>
		</div>
	);
}
