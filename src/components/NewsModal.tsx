import { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Spinner,
	ModalFooter,
	Button,
} from "@nextui-org/react";
import i18n from "@/locales/root.json";

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
							<ModalHeader className="mx-auto">XD</ModalHeader>
							<ModalBody className="min-h-[60vh] flex flex-col justify-center">
								<Spinner label="Cargando..." />
							</ModalBody>
							<ModalFooter>XD</ModalFooter>
						</>
					}
				</ModalContent>
			</Modal>
		</>
	);
}
