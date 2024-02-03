import i18n from "@/locales/anuario.json";
import { EyeFilledIcon } from "@nextui-org/shared-icons";

export default function YearBookNotFound() {
	return (
		<div className="min-h-[75vh] w-full flex flex-col justify-center items-center gap-y-2 opacity-30">
			<EyeFilledIcon className="text-5xl" />
			<span className="text-lg max-w-[30ch] text-center">{i18n.NOT_FOUND}</span>
		</div>
	);
}
