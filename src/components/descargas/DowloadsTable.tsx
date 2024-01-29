import LOCALE from "@/locales/descargas.json";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	Spinner,
	TableCell,
	TableRow,
	Button,
} from "@nextui-org/react";
import { cloneElement, useCallback } from "react";
import { FILE_ICONS } from "./FileIcons";
import { PiDownloadSimpleFill } from "react-icons/pi";

interface Template {
	file: string;
	size: string;
	type: string;
	date: string;
	[key: string]: string;
}

export function DowloadsTable() {
	const items: Template[] = [
		{
			date: "20/01/2015",
			file: "normas.pdf",
			type: "pdf",
			size: "666kb",
		},
		{
			date: "20/01/2015",
			file: "notas.xlsx",
			type: "xlsx",
			size: "666kb",
		},
		{
			date: "20/01/2015",
			file: "circular.docx",
			type: "docx",
			size: "666kb",
		},
		{
			date: "20/01/2015",
			file: "random.png",
			type: "png",
			size: "666kb",
		},
	];
	const renderCell = useCallback((file: Template, columnKey: string) => {
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
						variant="solid"
						isIconOnly
						className="hover:opacity-100 opacity-70 transition-opacity"
					>
						<PiDownloadSimpleFill className="text-lg text-foreground" />
					</Button>
				);
			default:
				return (
					<span className="font-bold text-md opacity-85">{cellValue}</span>
				);
		}
	}, []);

	return (
		<Table
			removeWrapper
			aria-label="Example table with client side pagination"
			className="py-6"
			classNames={{
				thead: "[&>tr]:first:shadow-sm",
			}}
		>
			<TableHeader className="bg-blue-600">
				<TableColumn key="file">
					{LOCALE.TABLE.COLUMNAS.NOMBRE_ARCHIVO}
				</TableColumn>
				<TableColumn key="type">
					{LOCALE.TABLE.COLUMNAS.TIPO_ARCHIVO}
				</TableColumn>
				<TableColumn key="size">
					{LOCALE.TABLE.COLUMNAS.SIZE_ARCHIVO}
				</TableColumn>

				<TableColumn key="date">
					{LOCALE.TABLE.COLUMNAS.FECHA_ARCHIVO}
				</TableColumn>
				<TableColumn key="download">
					{LOCALE.TABLE.COLUMNAS.DESCARGAR_ARCHIVO}
				</TableColumn>
			</TableHeader>

			<TableBody
				emptyContent={
					<div className="min-h-[75vh] grid place-content-center">
						<Spinner label="Cargando estudiantes" />
					</div>
				}
				items={items}
			>
				{(item) => (
					<TableRow key={item.file}>
						{(columnKey) => (
							<TableCell>{renderCell(item, columnKey.toString())}</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
