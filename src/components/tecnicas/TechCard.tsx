import { Tech } from "@/types/enums";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { cloneElement } from "react";
import { useRouter } from "next/navigation";

export function TechCard({
	dynamicPath,
	TechId,
	color,
	iconElement,
	description,
}: {
	dynamicPath: string;
	TechId: string;
	color: string;
	iconElement?: JSX.Element;
	description: string;
}) {
	const router = useRouter();
	return (
		<Card
			onClick={() => {
				router.push(`${dynamicPath}/${TechId.toLowerCase()}`);
			}}
			isPressable
			shadow="none"
			className="xl:p-6 hover:bg-default-200 bg-default-100 shadow-sm text-foreground transition-colors"
		>
			<CardHeader className="flex items-center justify-center pt-5 sm:pt-10">
				<div
					className="p-4 rounded-full border-2 border-primary"
					style={{
						backgroundColor: color,
					}}
				>
					{iconElement &&
						cloneElement(iconElement, {
							className: "lg:w-8 lg:h-8 text-white",
						})}
				</div>
			</CardHeader>
			<CardBody className="text-center pb-8">
				<h3 className="md:text-md text-lg font-bold mt-4 mb-2">
					{Tech[TechId as keyof typeof Tech]}
				</h3>
				<p className="text-sm">{description}</p>
			</CardBody>
		</Card>
	);
}
