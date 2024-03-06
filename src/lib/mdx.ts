import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx/remote/serialize";
import { BlogDir } from "../config/blog.config";
import { BlogEncriptacion } from "@/config/blog.config";

const root = process.cwd();

// Función para obtener los nombres de archivos en el directorio especificado5
export const getFiles = async (): Promise<string[]> => fs.promises.readdir(path.join(root, BlogDir));

/* 
Esta función obtiene el contenido y los metadatos de un archivo MDX dado su slug.
Lee el archivo, analiza su contenido utilizando gray-matter para extraer los metadatos y
el contenido, y luego serializa el contenido MDX utilizando next-mdx/remote/serialize.
*/
export const getFileBySlug = async ({ slug }: { slug: string }): Promise<{ source: string; frontmatter: Record<string, any> }> => {
    const mdxSource = await fs.promises.readFile(
        path.join(root, BlogDir, `${slug}.mdx`),
        { encoding: BlogEncriptacion }
    );

    const { data, content } = matter(mdxSource);
    const source = await serialize(content, {});

    return {
        source,
        frontmatter: {
            ...data,
        },
    };
};

// Función para obtener todos los archivos y sus metadatos
export const getAllFiles = async (): Promise<{ [key: string]: any }[]> => {
    const files = await getFiles();

    return files.map((postSlug) => {
        const mdxSource = fs.readFileSync(path.join(root, BlogDir, postSlug), {
            encoding: BlogEncriptacion,
        });

        const { data } = matter(mdxSource);

        return { ...data, slug: postSlug.replace(".mdx", "") };
    });
};

// Ejemplo de función getStaticProps utilizando getAllFiles para obtener los posts
export async function getStaticProps() {
    const posts = await getAllFiles();
    console.log(posts);
    return {
        props: { posts },
    };
}
