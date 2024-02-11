/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	Slider,
	Input,
} from "@nextui-org/react";
import i18n from "@/locales/anuario.json";
import { LuSettings2 } from "react-icons/lu";
import { useEffect, useMemo, useState } from "react";
import useYearBook from "@/hooks/useYearBook";

export function YearBookSettingsModal() {
	const {
		sigerd,
		limit: initLimit,
		isLoading,
		isNotAuth,
		setLimit: LimitHandler,
		setSigerd,
		fetchData,
	} = useYearBook();
	const [shouldOpen, setShouldOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [limit, setLimit] = useState(initLimit);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (sigerd < 1) {
			setShouldOpen(true);
			setIsOpen(true);
		}

		if (shouldOpen && sigerd > 1) setShouldOpen(false);
	}, [sigerd]);

	const onOpen = () => {
		setIsOpen(true);
	};

	useMemo(() => {
		if (isNotAuth) {
			setShouldOpen(true);
			setIsOpen(true);
		}
	}, [isNotAuth]);

	return (
		<>
			<Tooltip content={i18n.SETTINGS}>
				<Button
					isDisabled={isLoading}
					isIconOnly
					className="hover:opacity-100 opacity-60 transition-opacity text-lg"
					onPress={onOpen}
				>
					<LuSettings2 />
				</Button>
			</Tooltip>
			<Modal
				isDismissable={!shouldOpen}
				hideCloseButton={shouldOpen}
				isOpen={isOpen || shouldOpen}
				onOpenChange={() => {
					setIsOpen(!isOpen);
				}}
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Ajustes del anuario
							</ModalHeader>
							<ModalBody className="flex flex-col gap-12">
								<Input
									label="SIGER ID"
									variant="bordered"
									isRequired
									onChange={(e) => {
										setSigerd(Number(e.target.value));
									}}
									value={sigerd.toString()}
									errorMessage={shouldOpen && i18n.FORM.SIGERD_ERROR}
								/>
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
									isDisabled={shouldOpen}
									color="danger"
									variant="bordered"
									onPress={onClose}
								>
									Cerrar
								</Button>
								<Button
									isDisabled={shouldOpen}
									color="primary"
									onPress={() => {
										LimitHandler(limit);
										onClose();
										fetchData();
									}}
								>
									Aplicar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
