import LOCALE from "@/locales/anuario.json";
import { notFound } from "next/navigation";

export default function YearBookNotFound() {
	return (
		<div>
			<span>{LOCALE.NOT_FOUND}</span>
		</div>
	);
}
