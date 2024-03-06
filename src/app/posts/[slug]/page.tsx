import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/noticias/getPostMetadata";

function getPostContent(slug: string) {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult;
}

export function generateStaticParams() {
  const posts = getPostMetadata();
  return posts.map(function(post) {
    return {
      slug: post.slug,
    };
  });
}

function PostPage(props: any) {
  const slug = props.params.slug;
  const post = getPostContent(slug);
  return (
    <div>
      <div className="my-12 text-center">
        <h1 className="text-2xl text-primary ">{post.data.title}</h1>
        <p className="text-foreground mt-2">{post.data.date}</p>
      </div>

      <article className="prose">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  );
}

export default PostPage;
