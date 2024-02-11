"use client";
import { type Student } from "@/types/general";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Image,
	Skeleton,
	Button,
	Link,
} from "@nextui-org/react";
import { cloneElement, useEffect, useState } from "react";
import { TechIcons } from "../tecnicas/TechIcons";
import i18n from "@/locales/tecnicas.json";

export function YearBookStudent({
	student,
}: {
	student?: Student;
}) {
	const FIRST_YEAR = student?.school_years?.[0];
	const LAST_YEAR = student?.school_years?.[student.school_years.length - 1];

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Skeleton className="rounded-small" disableAnimation isLoaded={!!student}>
			<Card
				radius="sm"
				shadow="none"
				className="sm:h-[20rem] xs:max-h-[320px] xl:max-h-[none] sm:max-h-[335px] xs:max-w-[220px] w-full m-auto sm:p-2 bg-default-100 "
			>
				<CardHeader className="overflow-hidden relative min-h-[180px] px-3">
					<div className="flex items-center justify-center">
						<Image
							key={student?.id}
							classNames={{
								wrapper: "w-full h-full",
								img: "w-full h-full object-cover",
							}}
							src={student?.photo_url || ""}
							alt={student?.first_name || ""}
							loading="lazy"
							radius="sm"
						/>
					</div>
				</CardHeader>
				<CardBody className="!overflow-hidden place-self-center flex-none sm:py-2 py-0">
					<p className="block whitespace-nowrap max-w-[100%] overflow-hidden text-ellipsis text-xl font-semibold">
						{`${student?.first_name} ${student?.last_name}`}
					</p>
				</CardBody>
				<CardFooter className="flex gap-2 justify-between">
					<Chip size="lg" radius="sm" className="px-1 sm:text-lg text-sm">
						{`${FIRST_YEAR}-${LAST_YEAR ? LAST_YEAR.toString() : ""}`}
					</Chip>
					{student && (
						<>
							{TechIcons.map((iconItem) => {
								const cell = student.current_technique as string;
								const cellValue = Object.keys(iconItem)[0];
								const iconElement = iconItem[cell];
								const tecnica = i18n.TECHS.find(
									(item) => item.ID === cellValue,
								);

								if (!iconElement) {
									return null;
								}

								return (
									<Button
										as={Link}
										href={`/tecnicas/${cell.toLowerCase()}`}
										size="sm"
										className="p-2 text-white"
										isIconOnly
										variant="light"
										style={{
											backgroundColor: tecnica?.COLOR,
										}}
										key={cellValue} // Agregué una clave única para evitar advertencias en React
									>
										{iconElement &&
											cloneElement(iconElement, {
												className: "sm:text-lg text-sm",
											})}
									</Button>
								);
							})}
						</>
					)}
				</CardFooter>
			</Card>
		</Skeleton>
	);
}
