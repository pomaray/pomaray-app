import { BiQuestionMark } from "react-icons/bi";
import { Tooltip, Button } from "@nextui-org/react";
import Link from "next/link";
import i18n from "@/locales/anuario.json";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { YearBookSettingsModal } from "./YearBookSettingsModal";

export interface YearBookActionsProps {
	limit: number;
	isDisabled: boolean;
	videoExample: string;
	setLimit: (value: number) => void;
	onReSearch: () => void;
}

export function YearBookActions({
	limit,
	isDisabled,
	videoExample,
	setLimit,
	onReSearch,
}: YearBookActionsProps) {
	return (
		<div className="flex w-full justify-between gap-x-4 px-2 pb-6">
			<div className="flex gap-4">
				<Tooltip content={i18n.RE_SEARCH} color="primary">
					<Button
						isDisabled={isDisabled}
						color="primary"
						isIconOnly
						className="hover:opacity-100 opacity-60 transition-opacity text-lg"
						onPress={() => {
							onReSearch();
						}}
					>
						<MdOutlineSettingsBackupRestore />
					</Button>
				</Tooltip>
				<YearBookSettingsModal
					limitHandler={setLimit}
					isDisabled={isDisabled}
					limit={limit}
				/>
			</div>
			<div>
				<Tooltip content={i18n.VIDEO_EXAMPLE_TIP}>
					<Button
						as={Link}
						isIconOnly
						isDisabled={isDisabled}
						className="hover:opacity-100 opacity-60 transition-opacity text-lg"
						href={videoExample}
						target="_blank"
					>
						<BiQuestionMark />
					</Button>
				</Tooltip>
			</div>
		</div>
	);
}
