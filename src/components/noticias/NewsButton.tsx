import { Button } from "@nextui-org/button";
import i18n from "@/locales/root.json";

export function NewsButton() {
	return (
		<Button
			color="primary"
			variant="bordered"
			size="sm"
			className="text-foreground font-semibold"
		>
			{i18n.NAVBAR.SEE_NEWS}
		</Button>
	);
}
