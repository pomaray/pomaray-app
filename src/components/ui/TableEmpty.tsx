import { Spinner } from "@nextui-org/spinner";
import { EyeFilledIcon } from "@nextui-org/shared-icons";

export function TableEmpty({
	isLoading,
	isError,
	isNotFound,
}: {
	isLoading: boolean;
	isError: boolean;
	isNotFound: boolean;
}) {
	if (isLoading && !isError) {
		return (
			<div className="min-h-[75vh] grid place-content-center">
				<Spinner label="Cargando..." />
			</div>
		);
	}
	if (isError && isNotFound) {
		return (
			<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2">
				<EyeFilledIcon className="text-5xl" />
				<span className="text-lg">No se encontro ningun resultado.</span>
			</div>
		);
	}
	if (isError && !isNotFound) {
		return (
			<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2 opacity-30">
				<EyeFilledIcon className="text-danger text-5xl" />
				<span className="text-danger text-lg">
					Hubo un error, por favor intentelo de nuevo.
				</span>
			</div>
		);
	}
}
