import i18n from "@/locales/descargas.json";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableCell,
	TableRow,
	Button,
} from "@nextui-org/react";
import { cloneElement, useCallback } from "react";
import { FILE_ICONS } from "@/components/descargas/FileIcons";
import { PiDownloadSimpleFill } from "react-icons/pi";
import { type File } from "@/types/general";
import useFiles from "@/hooks/useFiles";
import { TableEmpty } from "@/components/ui/TableEmpty";

function handleDownload(filePath: string) {
	const link = document.createElement("a");
	link.href = filePath;
	link.download = filePath.split("/").pop() as string;
	link.click();
}

export function DownloadsTable() {
	const { isError, isNotFound, isLoading, files, fetchData } = useFiles();

	const renderCell = useCallback((file: File, columnKey: string) => {
		const cellValue = file[columnKey];
		const defaultFileIcon = FILE_ICONS.find(
			(icon) => Object.keys(icon)[0] === "default",
		)?.default as { icon: JSX.Element; color: string };

		switch (columnKey) {
			case "type": {
				const iconElement =
					FILE_ICONS.find((icon) => Object.keys(icon)[0] === cellValue)?.[
						cellValue as string
					] || defaultFileIcon;

				return (
					<div
						className={`bg-${iconElement.color} w-fit p-1 flex items-center justify-center rounded-lg text-white`}
					>
						{cloneElement(iconElement.icon, {
							size: 20,
						})}
					</div>
				);
			}

			case "download":
				return (
					<Button
						aria-label="Descargar archivo"
						variant="light"
						isIconOnly
						className="group hover:opacity-100 opacity-70 transition-opacity"
						onClick={() => {
							handleDownload(file.path);
						}}
					>
						<PiDownloadSimpleFill className="group-hover:translate-y-0 -translate-y-0.5 t transition-transform text-lg text-foreground" />
					</Button>
				);
			case "size":
				return (
					<span className="font-bold  sm:text-md text-xs opacity-50 text-nowrap">
						{cellValue}
					</span>
				);
			default:
				return (
					<span className="font-bold capitalize sm:text-lg text-md opacity-90 text-nowrap">
						{cellValue}
					</span>
				);
		}
	}, []);

	return (
		<Table
			shadow="none"
			className="py-6"
			aria-label="Tabla de descargas."
			classNames={{
				wrapper: "min-h-screen bg-transparent px-0",
				thead: "[&>tr]:first:shadow-sm",
			}}
		>
			<TableHeader className="bg-blue-600">
				<TableColumn key="type">{i18n.TABLE.COLUMNS.FILE_TYPE}</TableColumn>
				<TableColumn key="name">{i18n.TABLE.COLUMNS.FILE_NAME}</TableColumn>
				<TableColumn key="size">{i18n.TABLE.COLUMNS.FILE_SIZE}</TableColumn>

				<TableColumn key="download">
					{i18n.TABLE.COLUMNS.DOWNLOAD_FILE}
				</TableColumn>
			</TableHeader>

			<TableBody
				emptyContent={
					<TableEmpty
						isError={isError}
						isLoading={isLoading}
						isNotFound={isNotFound}
						onTry={fetchData}
					/>
				}
				items={files}
			>
				{(file) => (
					<TableRow key={file.name}>
						{(columnKey) => (
							<TableCell>{renderCell(file, columnKey.toString())}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
