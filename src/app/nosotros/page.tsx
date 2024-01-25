import { Section, SectionTitle } from "@/components/ui/Section";
import { Collage } from "@/components/Collage";
import HistoryTimeline from "@/components/Timeline";

export default function about() {
    return (
        <main className="min-h-screen overflow-x-hidden overflow-y-hidden">
            <Section>
                <SectionTitle withLine text="Caracteristicas" className="lg:text-7xl text-4xl font-extrabold sm:p-10 w-screen" />
                <ul className="grid sm:px-40 sm:py-16 px-6 py-10 sm:text-justify list-none">
                    <li className="lg:col-span-1 lg:col-start-1 flex flex-col items-center">
                        <p className="mb-9 text-xl lg:w-4/5 mx-auto max-w-[55ch]">
                            Descubre un entorno educativo innovador en nuestro Politécnico. Estamos comprometidos con la excelencia académica y el desarrollo integral de nuestros estudiantes.
                        </p>
                        <p className="mb-9 text-xl lg:w-4/5 mx-auto max-w-[55ch]">
                            ¡Preparamos a nuestros estudiantes para enfrentar los desafíos del mundo real! Enfocamos nuestros esfuerzos en brindar una educación de calidad que marca la diferencia.
                        </p>
                    </li>

                    <li className="lg:col-span-1 lg:col-start-2 flex flex-col items-center">
                        <p className="mb-6 text-xl lg:w-4/5 mx-auto max-w-[55ch]">
                            Explora oportunidades ilimitadas en nuestro centro educativo. Con instalaciones modernas y profesores apasionados, ¡preparamos a la próxima generación de líderes!
                        </p>
                        <p className="mb-6 text-xl lg:w-4/5 mx-auto max-w-[55ch]">
                            Explora oportunidades ilimitadas en nuestro centro educativo. Con instalaciones modernas y profesores apasionados, ¡preparamos a la próxima generación de líderes!
                        </p>
                    </li>
                </ul>
            </Section>




            <Section className="mx-auto pb-16 bg-primary">
                <SectionTitle color="background" withLine text="Nuestra Historia" />
            </Section>

        </main>
    );
}