import fs from "fs";
import matter from "gray-matter";
import { PostMetadata } from "./PostMetadata";

function getPostMetadata(): PostMetadata[] {
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".md"));

  // Funcion para renderizar los archivos markdown
  function processMarkdown(fileName: string): PostMetadata {
    const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
    const matterResult = matter(fileContents);
    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace(".md", ""),
    };
  }

  // Map sobre los archivos Markdown utilizando la función definida
  const posts = markdownPosts.map(processMarkdown);

  return posts;
}

export default getPostMetadata;