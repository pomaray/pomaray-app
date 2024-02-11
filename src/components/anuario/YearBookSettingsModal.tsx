import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
	Slider,
	Input,
} from "@nextui-org/react";
import i18n from "@/locales/anuario.json";
import { LuSettings2 } from "react-icons/lu";
import { useState } from "react";

export interface YearBookSettingsModalProps {
	limit: number;
	isDisabled: boolean;
	limitHandler: (newLimit: number) => void;
}

export function YearBookSettingsModal({
	limit: initLimit,
	isDisabled,
	limitHandler,
}: YearBookSettingsModalProps) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [limit, setLimit] = useState(initLimit);
	return (
		<>
			<Tooltip content={i18n.SETTINGS}>
				<Button
					isDisabled={isDisabled}
					isIconOnly
					className="hover:opacity-100 opacity-60 transition-opacity text-lg"
					onPress={onOpen}
				>
					<LuSettings2 />
				</Button>
			</Tooltip>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Ajustes del anuario
							</ModalHeader>
							<ModalBody className="flex flex-col gap-12">
								<Input label="SIGER ID" variant="bordered" />
								<Slider
									size="md"
									step={5}
									label="Limite de estudiantes por pagina"
									showSteps={true}
									maxValue={50}
									minValue={5}
									value={limit}
									defaultValue={limit}
									className="max-w-md"
									onChange={(newLimit) => {
										setLimit(newLimit as number);
									}}
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="primary"
									onPress={() => {
										limitHandler(limit);
										onClose();
									}}
								>
									Aplicar
								</Button>
								<Button color="danger" variant="light" onPress={onClose}>
									Cerrar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
