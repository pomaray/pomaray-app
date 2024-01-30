import i18n from "@/locales/anuario.json";
import { notFound } from "next/navigation";

export default function YearBookNotFound() {
	return (
		<div>
			<span>{i18n.NOT_FOUND}</span>
		</div>
	);
}
