import i18n from "@/locales/home.json";
import { Title } from "@/components/ui/Title";
import { Reveal } from "./ui/ScrollReveal";

export function Ubicacion() {
	return (
		<Reveal>
			<section id="ubicacion" className="text-center px-8">
				<Title withLine text={i18n.LOCATION.TITLE} />
				<div>
					<iframe
						title="Ubicación"
						className="w-full h-[60vh] rounded-lg"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.213641194164!2d-69.99740142496333!3d18.473979582610603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf8a793d63f471%3A0xf12da92c55cac14b!2sMadre%20Rafaela%20Ybarra%20Polytecniquenic!5e0!3m2!1sen!2sdo!4v1700580333116!5m2!1sen!2sdo"
						allowFullScreen
					/>
				</div>
			</section>
		</Reveal>
	);
}
