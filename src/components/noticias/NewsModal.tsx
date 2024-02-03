import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Spinner,
	ModalFooter,
	Button,
	ScrollShadow,
} from "@nextui-org/react";
import i18n from "@/locales/root.json";
import { NewsCard } from "./NewsCard";
import { Title } from "../ui/Title";
import Link from "next/link";

export function NewsModal() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (window.location.pathname === "/") {
			setIsOpen(true);
		}
	}, []);

	return (
		<>
			<Button
				onClick={() => {
					setIsOpen(true);
				}}
				color="primary"
				variant="bordered"
				size="sm"
				className="text-foreground font-semibold"
			>
				{i18n.NAVBAR.SEE_NEWS}
			</Button>
			<Modal
				isOpen={isOpen}
				placement="auto"
				onOpenChange={(value) => {
					setIsOpen(value);
				}}
				size="5xl"
			>
				<ModalContent>
					{
						<>
							<ModalHeader className="text-primary text-4xl -mb-10">
								<Title
									classNames={{
										line: "max-w-[12ch] mx-auto",
									}}
									className="w-full text-center"
									text="Ultimas noticias"
								/>
							</ModalHeader>
							<ModalBody className="h-[90vh] flex flex-col justify-center">
								<ScrollShadow className="min-w-[300px]  h-[380px]">
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-full max-h-[70vh] -py-10">
										{Array.from({ length: 3 }, (_, index) => {
											return (
												<NewsCard
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={index}
													id={index.toString()}
													isLoaded={true}
												/>
											);
										})}
									</div>
								</ScrollShadow>
							</ModalBody>
							<ModalFooter className="-mt-10 sm:mt-0">
								<Button
								fullWidth
									onClick={() => {
										setIsOpen(false);
									}}
									as={Link}
									href="/noticias"
									color="primary"
									className="text-sm px-4 sm:text-sm *:"
								>
									Ver todas las noticias
								</Button>
								<Button
								fullWidth
									onClick={() => {
										setIsOpen(false);
									}}
									color="danger"
									variant="bordered"
								>
									Cerrar
								</Button>
							</ModalFooter>
						</>
					}
				</ModalContent>
			</Modal>
		</>
	);
}
