import { Image } from "@nextui-org/react";
import locale from "@/locales/privacidad.json";

export default function PoliticaPrivacidadPage() {
    return (
        <article className="max-w-5xl mx-auto px-6 sm:px-12 py-6">
            <div className=" gap-4 items-center">
                <h1 className="sm:text-5xl text-4xl font-bold my-4 text-primary">
                    {locale.HERO.TITULO}
                </h1>   
            <p className="text-pretty mt-2">{locale.HERO.DESCRIPCION}</p>
            </div>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.INTRODUCCION.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.INTRODUCCION.CONTENIDO}</p>
            </section>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.INFORMACION_RECOPILADA.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.INFORMACION_RECOPILADA.CONTENIDO}</p>
            </section>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.USO_DE_LA_INFORMACION.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.USO_DE_LA_INFORMACION.CONTENIDO}</p>
            </section>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.SEGURIDAD.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.SEGURIDAD.CONTENIDO}</p>
            </section>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.ENLACES_EXTERNOS.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.ENLACES_EXTERNOS.CONTENIDO}</p>
            </section>

            <section>
                <h2 className="sm:text-3xl text-2xl text-balance text-primary py-6 font-bold">
                    {locale.CAMBIOS_EN_LA_POLITICA.TITULO}
                </h2>
                <p className="text-pretty mt-2">{locale.CAMBIOS_EN_LA_POLITICA.CONTENIDO}</p>
            </section>

        </article>
    );
}