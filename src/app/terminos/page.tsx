import i18n from "@/locales/terminos.json";

export default function TerminosCondicionesPage() {
	return (
		<article className="max-w-5xl mx-auto px-6 sm:px-12 py-6 pb-20">
			<div className=" gap-4 items-center">
				<h1 className="sm:text-5xl text-4xl font-bold my-4 text-primary">
					{i18n.HERO.TITLE}
				</h1>
				<p className="text-pretty mt-2">{i18n.HERO.DESCRIPTION}</p>
			</div>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.INTRODUCTION.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.INTRODUCTION.CONTENT}</p>
			</section>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.COLLECTED_INFORMATION.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.COLLECTED_INFORMATION.CONTENT}</p>
			</section>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.INFORMATION_USE.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.INFORMATION_USE.CONTENT}</p>
			</section>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.SECURITY.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.SECURITY.CONTENT}</p>
			</section>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.EXTERNAL_LINKS.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.EXTERNAL_LINKS.CONTENT}</p>
			</section>

			<section>
				<h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
					{i18n.POLICY_CHANGES.TITLE}
				</h2>
				<p className="text-pretty mt-2">{i18n.POLICY_CHANGES.CONTENT}</p>
			</section>
		</article>
	);
}
