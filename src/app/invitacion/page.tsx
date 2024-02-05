import locale from '@/locales/evento.json';
import { Image } from "@nextui-org/react";

export default function EventoComponent() {
    return (
        <section className='p-[10vh]'>
            <div className="bg-transparent border-2 border-green-500 rounded-md p-8 text-center mx-auto max-w-[60ch]">
                <aside className="flex justify-center items-center mt-4">
                    <Image src={locale.logotipo} alt="Logotipo" className="w-16 h-16 mr-4" />
                </aside>

                <p className="md:text-4xl xl:text-6xl font-bold text-foreground mt-4">{locale.titulo}</p>

                <p className="text-foreground mt-2">{locale.fecha}</p>
                <p className='text-foreground'>{locale.descripcion}</p>
                
                <article className="text-sm text-foreground mt-2">
                    <span>{locale.textoHora}: </span><span className="text-foreground">{locale.hora}</span>
                    <span className="mx-2">/</span>
                    <span>{locale.textoLugar}: </span><span className="text-foreground">{locale.lugar}</span>
                </article>

                <aside className="flex justify-end items-center mt-4 right-0">
                    <Image src={locale.codigoQR} alt="Código QR" className="w-16 h-16 " />
                </aside>

            </div>
        </section>
    );
}
