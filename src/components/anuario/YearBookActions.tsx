import { BiQuestionMark } from "react-icons/bi";
import { SearchIcon } from "@nextui-org/shared-icons";
import { Tooltip, Button } from "@nextui-org/react";
import Link from "next/link";
import i18n from "@/locales/anuario.json";

export interface YearBookActionsProps {
	isDisabled: boolean;
	onReSearch: () => void;
	videoExample: string;
}

export function YearBookActions({
	isDisabled,
	onReSearch,
	videoExample,
}: YearBookActionsProps) {
	return (
		<div className="flex w-full justify-between gap-x-4 px-2 pb-6">
			<div className="flex gap-4">
				<Tooltip content={i18n.RE_SEARCH} color="primary">
					<Button
						isDisabled={isDisabled}
						color="primary"
						isIconOnly
						className="hover:opacity-100 opacity-60 transition-opacity"
						onPress={() => {
							onReSearch();
						}}
					>
						<SearchIcon />
					</Button>
				</Tooltip>
			</div>
			<div>
				<Tooltip content={i18n.VIDEO_EXAMPLE_TIP}>
					<Button
						as={Link}
						isIconOnly
						isDisabled={isDisabled}
						className="hover:opacity-100 opacity-60 transition-opacity"
						href={videoExample}
					>
						<BiQuestionMark className="text-xl" />
					</Button>
				</Tooltip>
			</div>
		</div>
	);
}
