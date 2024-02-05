"use client";

import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Image,
	Skeleton,
} from "@nextui-org/react";
import { EyeIcon } from "@nextui-org/shared-icons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function NewsCard({
	id,
	isLoaded = false,
}: {
	id?: string;
	isLoaded?: boolean;
}) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const dynamicPath = `/notcias/${id}`;
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setTimeout(() => {
			setIsOpen(false);
		}, 1000);
	}, [isOpen]);

	return (
		<Card
			isPressable={isLoaded}
			onPress={() => {
				router.push(dynamicPath);
			}}
			radius="sm"
			shadow="none"
			className={twMerge(
				"bg-default-100 pt-4 shadow-sm transition-colors max-w-full",
				`${isLoaded && "hover:bg-default-200"}`,
			)}
		>
			<CardHeader className="h-48 px-6">
				<Skeleton
					isLoaded={isLoaded}
					disableAnimation
					className="rounded-lg w-full"
				>
					<Image src={""} alt={""} className="h-48 object-cover rounded-t-md" />
				</Skeleton>
			</CardHeader>

			<CardBody className="px-6 max-w-full gap-y-2">
				{/* <Chip size="sm" color="primary">
					{}
				</Chip> */}

				<Skeleton
					isLoaded={isLoaded}
					disableAnimation
					className="rounded-lg w-full"
				>
					<h3 className="md:text-md text-lg font-bold line-clamp-2 min-h-8">
						{}
					</h3>
				</Skeleton>
				<Skeleton
					isLoaded={isLoaded}
					disableAnimation
					className="rounded-lg w-full min-h-16"
				>
					<p className="text-xs text-wrap max-w-full">{}</p>
				</Skeleton>
			</CardBody>

			<CardFooter className="px-6">
				<Skeleton
					isLoaded={isLoaded}
					disableAnimation
					className={twMerge(
						"rounded-lg w-full min-w-28 h-7",
						isLoaded && "h-fit",
					)}
				>
					<div className="flex justify-between items-center h-12 opacity-50 px-6">
						<time className="mb-2 text-xs ml-2">{"24/01/2017"}</time>

						<div className="flex text-sm gap-2 items-center">
							<div className="flex items-center gap-2">
								<EyeIcon />
								<span>666</span>
							</div>
						</div>
					</div>
				</Skeleton>
			</CardFooter>
		</Card>
	);
}
