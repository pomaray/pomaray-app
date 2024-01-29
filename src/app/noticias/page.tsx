"use client";
import {
	Card,
	CardBody,
	Image,
	Chip,
	CardFooter,
	CardHeader,
	Pagination,
	Button,
	Spinner,
	Tooltip,
} from "@nextui-org/react";
import { CopyIcon, EyeIcon } from "@nextui-org/shared-icons";
import { useEffect, useState } from "react";

export default function NewsPage() {
	const [isLoaded, setIsLoaded] = useState(false);
	// Estado para gestionar si cada Tooltip está abierto o cerrado
	const [tooltipOpen, setTooltipOpen] = useState(Array(12).fill(false));

	const handleButtonClick = (index: number) => {
		// Abrir el Tooltip
		const newTooltipOpen = [...tooltipOpen];
		newTooltipOpen[index] = true;
		setTooltipOpen(newTooltipOpen);

		copyToClipboard();
	};

	useEffect(() => {
		if (!isLoaded) {
			setTimeout(() => {
				setIsLoaded(!isLoaded);
			}, 3000);
		}
	}, [isLoaded]);

	const copyToClipboard = () => {
		const url = window.location.href;
		navigator.clipboard.writeText("Daniel el mejor");
	};

	return (
		<main>
			<section
				className={`pb-20 min-h-[80vh] ${
					isLoaded
						? "container mx-auto grid grid-cols-6 gap-4 "
						: "grid place-content-center"
				}`}
			>
				{isLoaded ? (
					Array.from({ length: 12 }, (_, index) => {
						return (
							<Card
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								isPressable
								shadow="none"
								className="hover:bg-default-200 bg-default-100 shadow-sm transition-colors"
							>
								<CardHeader className="h-48">
									<Image
										src={""}
										alt={""}
										className="w-screen h-48 object-cover rounded-t-md"
									/>
								</CardHeader>

								<CardBody className="px-6">
									<Chip size="sm" color="primary" className="mb-2">
										{`Categoria ${index}`}
									</Chip>
									<h3 className="md:text-md text-lg font-bold mb-2 line-clamp-2">
										{`Noticia ${index}`}
									</h3>
									<p className="text-xs line-clamp-3">
										Lorem ipsum dolor, sit amet consectetur adipisicing elit.
										Minus id, eum quod quidem ipsum ad omnis pariatur rerum,
										minima vel delectus, optio commodi aliquam? Sapiente rerum
										sit fugiat nobis praesentium.
									</p>
								</CardBody>

								<CardFooter className="flex justify-between items-center h-12 opacity-50">
									<time className="mb-2 text-xs ml-2">{"24/01/2017"}</time>
									<div className="flex text-sm gap-2 items-center">
										<div className="flex items-center gap-2">
											<EyeIcon />
											<span>666</span>
										</div>

										<Tooltip
											content="Copiado!"
											isOpen={tooltipOpen[index]}
											onOpenChange={(open) => {
												if (!open) {
													const newTooltipOpen = [...tooltipOpen];
													newTooltipOpen[index] = false;
													setTooltipOpen(newTooltipOpen);
												}
											}}
										>
											<Button
												onPress={() => {
													handleButtonClick(index);
												}}
												isIconOnly
												variant="light"
											>
												<CopyIcon />
											</Button>
										</Tooltip>
									</div>
								</CardFooter>
							</Card>
						);
					})
				) : (
					<Spinner label="Cargando notcias" />
				)}
			</section>
			<section className="flex justify-center pb-10">
				<Pagination isDisabled={!isLoaded} size="lg" total={30} page={1} />
			</section>
		</main>
	);
}
