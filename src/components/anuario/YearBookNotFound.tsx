import i18n from "@/locales/anuario.json";
import { Button } from "@nextui-org/react";
import { EyeFilledIcon } from "@nextui-org/shared-icons";
import { SlReload } from "react-icons/sl";

export default function YearBookNotFound({
	onTry,
}: {
	onTry: () => void;
}) {
	return (
		<div className="w-full flex flex-col justify-center items-center gap-y-6">
			<EyeFilledIcon className="text-5xl opacity-30" />
			<span className="text-lg max-w-[30ch] text-center opacity-30">
				{i18n.NOT_FOUND}
			</span>
			<div className="group">
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
