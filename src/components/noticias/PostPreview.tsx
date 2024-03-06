import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

function PostPreview(props: PostMetadata) {
    return (
        <div className="border border-slate-300 p-4 rounded-md shadow-sm">
            <p className="text-sm text-foreground">{props.date}</p>

            <Link href={`/posts/${props.slug}`}>
                <h2 className="text-primary hover:underline mb-4">{props.title}</h2>
            </Link>
            <p className="text-slate-400">{props.subtitle}</p>
        </div>
    )
}

export default PostPreview;
