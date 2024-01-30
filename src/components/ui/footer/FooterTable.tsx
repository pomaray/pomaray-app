import i18n from "@/locales/root.json";
import { FooterItem } from "@/components/ui/footer/FooterItem";
export function FooterTable() {
	return i18n.FOOTER.map((table) => (
		<ul
			key={table.TITLE}
			className="relative flex flex-col gap-1 w-fit h-fit p-4"
		>
			<h3 className="font-bold text-base py-2">{table.TITLE}</h3>
			{table.ELEMENTS.map((element) => (
				<FooterItem
					key={element.LINK.trim()} // Usé "element" en lugar de "item"
					text={element.TEXT as string}
					href={element.LINK}
				/>
			))}
		</ul>
	));
}
