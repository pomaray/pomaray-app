"use client";
import {
	Button,
	Modal,
	ModalContent,
	ModalFooter,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@nextui-org/react";
import { DeleteDocumentBulkIcon } from "@nextui-org/shared-icons";
import { Session } from "@/types/general";
import { Role } from "@/types/enums";
import useAuthStore from "@/hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { SESSIONS_URL } from "@/types/request/user";
import { ErrorTxt } from "@/components/ui/Errors";

interface AdminEditSessionModal {
	editSession?: Session;
	onClose: () => void;
}

export function AdminEditSessionModal({
	editSession,
	onClose,
}: AdminEditSessionModal) {
	const { isOpen, onOpen, onOpenChange, onClose: Close } = useDisclosure();
	const { user, isLoading: userLoading } = useAuthStore();
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const deleteSession = async () => {
		setError(""); // Limpiamos el error si la validación fue exitosa
		setIsLoading(true);
		try {
			await axios.delete(`${SESSIONS_URL}/${editSession?.token}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			Close();
			onClose?.();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setError(error.response?.data.message);
				return;
			}

			setError("Hubo un error, por favor inténtelo de nuevo.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Tooltip content="Elimar la session">
				<Button
					isDisabled={user?.role !== Role.SUPER_ADMIN || userLoading}
					onPress={onOpen}
					isIconOnly
				>
					<DeleteDocumentBulkIcon className="text-lg text-foreground" />
				</Button>
			</Tooltip>
			<Modal
				backdrop="opaque"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: "easeOut",
							},
						},
						exit: {
							y: 20,
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: "easeIn",
							},
						},
					},
				}}
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1 text-sm">
								<span className="opacity-75">Eliminar a:</span>
								<span className="text-3xl">{editSession?.ip}</span>
								<div className="text-foreground">
									<span className="opacity-60">Dispositivo: </span>
									<span className="font-bold capitalize">
										{editSession?.device}
									</span>
								</div>
							</ModalHeader>
							<form
								onSubmit={() => {
									onClose();
									onOpen();
								}}
							>
								<ModalFooter>
									<Button
										onClick={deleteSession}
										isLoading={isLoading}
										fullWidth
										color="danger"
										variant="bordered"
									>
										Eliminar
									</Button>
									<ErrorTxt>{error}</ErrorTxt>
								</ModalFooter>
							</form>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
