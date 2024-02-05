import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { formatDate, formatSize } from "@/utils/general";
import { type File } from "@/types/general";

export async function GET() {
	const rootFolder = process.cwd();
	const relativeFolderPath = "/public/files";

	const absoluteFolderPath = path.join(rootFolder, relativeFolderPath);

	try {
		const files: string[] = await fs.readdir(absoluteFolderPath);

		const filesInfo: File[] = await Promise.all(
			files.map(async (fileName) => {
				const filePath = path.join(absoluteFolderPath, fileName);

				try {
					const fileStats = await fs.stat(filePath);

					return {
						name: fileName.split(".")[0],
						type: path.extname(fileName).toLowerCase(),
						size: formatSize(fileStats.size),
						date: formatDate(fileStats.mtime),
						path: filePath,
					} as File;
				} catch (error) {
					console.error(
						`Error processing file ${fileName}: ${
							error instanceof Error && error.message
						}`,
					);
					return {
						name: "unknown",
						type: "unknown",
						size: "unknown",
						date: "unknown",
						path: "unknown",
					} as File;
				}
			}),
		);

		return NextResponse.json(filesInfo);
	} catch (error) {
		return NextResponse.json(
			{
				code: "500",
				message:
					error instanceof Error
						? error.message
						: "Error interno del servidor.",
			},
			{
				status: 500,
				statusText: "ERR_INTERNAL_SERVER_ERROR",
			},
		);
	}
}
