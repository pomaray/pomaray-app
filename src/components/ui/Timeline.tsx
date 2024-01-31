"use client";
import { Card, CardBody, Divider, Image, Tab, Tabs, tabs } from "@nextui-org/react";

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
      radius="full"
      items={points}
      fullWidth
      defaultSelectedKey={points[0].date}
      className="font-bold grid place-content-center"
    >

      {(point) => (

        <Tab key={point.date} title={point.date} className="max-w-[1000px] mx-auto">
          <Card shadow="none">
            <CardBody className="min-h-72">
              <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                <div className="relative col-span-6 md:col-span-4 h-full">
                  <Image src={point.imageSrc} alt={point.title} className="aspect-square" classNames={
                    {
                      img: "w-full h-full object-cover asc",
                      wrapper: "!max-w-full"
                    }
                  } />
                </div>
                <div className="flex flex-col col-span-6 md:col-span-8">
                  <h2 className="text-balance px-20 text-2xl my-5 font-semibold text-primary underline">{point.date}</h2>
                  <p className="text-balance px-20 text-xl">{point.content}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      )}
    </Tabs>
  );
}
