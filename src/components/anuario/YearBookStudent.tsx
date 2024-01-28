import { type Student } from "@/types/student";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Chip,
	Image,
	Skeleton,
} from "@nextui-org/react";

export function YearBookStudent({
	student,
}: {
	student?: Student;
}) {
	const FIRST_YEAR = student?.school_years?.[0];
	const LAST_YEAR = student?.school_years?.[student.school_years.length - 1];

	return (
		<Skeleton
			disableAnimation={true}
			className="rounded-lg shadow-sm"
			isLoaded={!!student}
		>
			<Card
				radius="lg"
				shadow="none"
				className="xs:h-80 xs:max-h-[310px] p-4 xl:max-h-[none] max-h-[335px] max-w-[220px] w-full m-auto bg-default-100"
			>
				<CardHeader className="overflow-hidden relative min-h-[180px] p-0">
					<div className="absolute flex items-center justify-center">
						<Image
							key={student?.id}
							classNames={{
								wrapper: "w-full h-full",
								img: "w-full h-full object-cover",
							}}
							src={student?.photo_url || ""}
							alt={student?.first_name || ""}
							loading="lazy"
						/>
					</div>
				</CardHeader>
				<CardBody className="!overflow-hidden place-self-center flex-none">
					<p className="block whitespace-nowrap max-w-[100%] overflow-hidden text-ellipsis text-lg font-semibold">
						{`${student?.first_name} ${student?.last_name}`}
					</p>
				</CardBody>
				<CardFooter className="grid grid-cols-2 gap-4 max-w-full row-span-1">
					<Chip size="md">
						{`${FIRST_YEAR}-${
							LAST_YEAR ? LAST_YEAR.toString().slice(2, 5) : ""
						}`}
					</Chip>
					<Chip size="md">{student?.current_technique || ""}</Chip>
				</CardFooter>
			</Card>
		</Skeleton>
	);
}
