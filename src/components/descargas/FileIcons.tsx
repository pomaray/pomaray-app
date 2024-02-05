import { FaFile, FaFileExcel, FaFileWord } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa";

export type FileIcon = {
	[key: string]: {
		icon: JSX.Element;
		color: string;
	};
};

export const FILE_ICONS: FileIcon[] = [
	{ ".pdf": { icon: <FaFilePdf />, color: "danger" } },
	{ ".docx": { icon: <FaFileWord />, color: "blue-600" } },
	{ ".xlsx": { icon: <FaFileExcel />, color: "success" } },
	{ default: { icon: <FaFile />, color: "default-200" } },
];
