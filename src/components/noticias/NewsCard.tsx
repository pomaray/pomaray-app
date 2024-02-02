"use client";

import {
	Card,
	CardHeader,
	CardBody,
	Chip,
	CardFooter,
	Image,
	Skeleton,
} from "@nextui-org/react";
import { EyeIcon } from "@nextui-org/shared-icons";
import { useState, useEffect } from "react";

export function NewsCard({
	id,
	isLoaded = false,
}: {
	id?: string;
	isLoaded?: boolean;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const dynamicPath = `/notcias/${id}`;
	const copyToClipboard = () => {
		setIsOpen(true);
		const url = window.location.href;
		navigator.clipboard.writeText(dynamicPath);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setTimeout(() => {
			setIsOpen(false);
		}, 1000);
	}, [isOpen]);

	return (
		<Skeleton disableAnimation isLoaded={isLoaded} className="rounded-lg p-2">
			<Card
				isPressable
				shadow="none"
				className="hover:bg-default-200 bg-default-100 shadow-sm transition-colors max-w-full"
			>
				<CardHeader className="h-48">
					<Image
						src={""}
						alt={""}
						className="w-screen h-48 object-cover rounded-t-md"
					/>
				</CardHeader>

				<CardBody className="px-6 max-w-full">
					<Chip size="sm" color="primary" className="mb-2">
						Categoria
					</Chip>
					<h3 className="md:text-md text-lg font-bold mb-2 line-clamp-2">
						Noticia
					</h3>
					<p className="text-xs text-wrap max-w-full">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus id,
						eum quod quidem ipsum ad omnis pariatur rerum, minima vel delectus,
						optio commodi aliquam? Sapiente rerum sit fugiat nobis praesentium.
					</p>
				</CardBody>

				<CardFooter className="flex justify-between items-center h-12 opacity-50 pr-6">
					<time className="mb-2 text-xs ml-2">{"24/01/2017"}</time>
					<div className="flex text-sm gap-2 items-center">
						<div className="flex items-center gap-2">
							<EyeIcon />
							<span>666</span>
						</div>
					</div>
				</CardFooter>
			</Card>
		</Skeleton>
	);
}
