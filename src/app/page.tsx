import { Hero } from "@/components/Hero";
import { MedidasDeSeguridad } from "@/components/MedidasSeguridad";
import { Ubicacion } from "@/components/Ubicacion";
import { UltimasNoticias } from "@/components/UltimasNoticias";
import { VidaYCultura } from "@/components/VidaYCultura";

export default function HomePage() {
	return (
		<main>
			<Hero />

			<div className="container flex flex-col gap-y-20 mx-auto -mt-20 xl:px-12">
				<MedidasDeSeguridad />

				<UltimasNoticias />

				<Ubicacion />

				<VidaYCultura />
			</div>
		</main>
	);
}
