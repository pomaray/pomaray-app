import { Spinner } from "@nextui-org/spinner";
import { EyeIcon, CloseIcon } from "@nextui-org/shared-icons";

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
				<EyeIcon className="text-danger text-5xl" />
				<span className="text-lg">No se encontro ningun resultado.</span>
			</div>
		);
	}
	if (isError && !isNotFound) {
		return (
			<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2">
				<CloseIcon className="text-danger text-5xl" />
				<span className="text-lg">
					Hubo un error, por favor intentelo de nuevo.
				</span>
			</div>
		);
	}
}
