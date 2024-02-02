"use client";
import { Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";

type TimelinePoint = {
	title: string;
	content: string;
	imageSrc: string;
	date: string;
};

type HistoryTimelineProps = {
	points: TimelinePoint[];
};

export default function HistoryTimeline({ points }: HistoryTimelineProps) {
	return (
		<Tabs
			aria-label="TimeLine tabs"
			size="lg"
			color="primary"
			radius="sm"
			items={points}
			fullWidth
			defaultSelectedKey={points[0].date}
			className="font-bold grid place-content-center"
			classNames={{
				tabList: "shadow-sm",
			}}
		>
			{(point) => (
				<Tab
					key={point.date}
					title={point.date}
					className="max-w-[1000px] mx-auto"
				>
					<Card shadow="none" radius="sm">
						<CardBody className="min-h-72 px-20">
							<div className="flex flex-col md:gap-4 items-center justify-center">
								<div className="relative col-span-6 md:col-span-4 h-full">
									<Image
										src={point.imageSrc}
										alt={point.title}
										className="aspect-auto h-72"
										radius="sm"
										removeWrapper
									/>
								</div>
								<div className="flex flex-col col-span-6 md:col-span-8">
									<h2 className="text-balance text-2xl my-5 font-semibold text-primary underline">
										{point.date}
									</h2>
									<p className="text-pretty pb-10 text-lg">{point.content}</p>
								</div>
							</div>
						</CardBody>
					</Card>
				</Tab>
			)}
		</Tabs>
	);
}
