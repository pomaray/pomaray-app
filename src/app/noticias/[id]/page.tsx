import { NEWS_ENDPOINT, NewsReponse } from "@/types/request/news";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage({
	params,
}: { params: { id: string } }) {
	try {
		// MDX text - can be from a local file, database, CMS, fetch, anywhere...
		const res = await fetch(`${NEWS_ENDPOINT}${params.id}/`, {
			method: "GET",
			headers: {
				"content-type": "application/json",
			},
		});
		console.log(`${NEWS_ENDPOINT}/${params.id}/`);

		const body = (await res.json()) as NewsReponse;

		if (!body.news) {
			return <div>{body.message}</div>;
		}
		return <MDXRemote source={body.news.content} />;
	} catch (error) {
		console.error(error);
	}
}
