import { BiQuestionMark } from "react-icons/bi";
import { Tooltip, Button } from "@nextui-org/react";
import Link from "next/link";
import i18n from "@/locales/anuario.json";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { YearBookSettingsModal } from "./YearBookSettingsModal";
import useYearBook from "@/hooks/useYearBook";

export function YearBookActions() {
	const { isLoading, fetchData } = useYearBook();

	return (
		<aside className="flex w-full justify-between gap-x-4 px-2 pb-6">
			<div className="flex gap-4">
				<Tooltip content={i18n.RE_SEARCH} color="primary">
					<Button
						isDisabled={isLoading}
						color="primary"
						isIconOnly
						className="hover:opacity-100 opacity-60 transition-opacity text-lg"
						onPress={() => {
							fetchData();
						}}
					>
						<MdOutlineSettingsBackupRestore />
					</Button>
				</Tooltip>
				<YearBookSettingsModal />
			</div>
			<Tooltip content={i18n.VIDEO_EXAMPLE_TIP}>
				<Button
					as={Link}
					isIconOnly
					isDisabled={isLoading}
					className="hover:opacity-100 opacity-60 transition-opacity text-lg"
					href={i18n.VIDEO_EXAMPLE}
					target="_blank"
				>
					<BiQuestionMark />
				</Button>
			</Tooltip>
		</aside>
	);
}
