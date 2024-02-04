import { Spinner } from "@nextui-org/spinner";
import { EyeFilledIcon } from "@nextui-org/shared-icons";
import { Button } from "@nextui-org/react";
import { SlReload } from "react-icons/sl";

export function TableEmpty({
	isLoading,
	isError,
	isNotFound,
	onTry,
}: {
	isLoading: boolean;
	isError: boolean;
	isNotFound: boolean;
	onTry: () => void;
}) {
	if (isLoading && !isError) {
		return (
			<div className="min-h-[75vh] grid place-content-center">
				<Spinner label="Cargando, por favor espere." />
			</div>
		);
	}
	if (isError && isNotFound) {
		return (
			<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2">
				<EyeFilledIcon className="text-5xl" />
				<span className="text-lg">No se encontró ningún resultado.</span>
			</div>
		);
	}
	if (isError && !isNotFound) {
		return (
			<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2">
				<EyeFilledIcon className="text-5xl opacity-30" />
				<span className="text-lg max-w-[30ch] opacity-30">
					Hubo un error, por favor inténtelo de nuevo.
				</span>
				<div className="group mt-5">
					<Button
						name="Buscar estudiantes"
						aria-label="Volver a buscar estudiantes"
						className="opacity-30 group-hover:opacity-100 transition-opacity"
						onPress={onTry}
					>
						<SlReload className="transform rotate-0 group-hover:-rotate-180 duration-1000 transition-transform" />
						Volver a intentarlo.
					</Button>
				</div>
			</div>
		);
	}
}
