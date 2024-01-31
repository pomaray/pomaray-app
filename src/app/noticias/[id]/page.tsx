"use client";
import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import NEWS_DATA from "@/locales/noticias.json";
import { Image, Card, Button, Chip, CardBody, CardFooter } from "@nextui-org/react";

export default function NewsPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const news = NEWS_DATA.NEWS.find((item) => item.ID === id);

    if (!news) {
        return (
            <main className="min-h-screen">
                <p>Noticia no encontrada</p>
            </main>
        );
    }
    return (
        <main className="min-h-screen ">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-9 sm:px-12 py-6 md:mx-auto sm:py-1">
                <div>
                    <Image
                        shadow="none"
                        src={news.imagen_principal}
                        alt={news.titular}
                        className="w-screen md:h-60 xl:h-[40vh] sm:h-32 lg:w-screen lg:h-32 rounded-md object-cover 2xl:max-h-[50vh] 2xl:top-10 "
                    />
                </div>
                <div className="flex flex-col justify-center sm:items-start py-8 sm:py-1 ">
                    <Chip size="sm" className="mb-2 max-w-ful sm:max-w-[12ch]">
                        {news.etiqueta}
                    </Chip>
                    <h1 className="text-4xl font-bold mb-2 text-balance">
                        {news.titular}
                    </h1>
                    <p className="text-foreground mb-4 text-lg">{news.ENTRADA}</p>
                </div>
            </section>

            <section className="py-6 mx-9">
                <h2 className="text-3xl font-bold mb-4 text-primary">
                    Descripción
                </h2>
                <p className="text-foreground mb-4 text-lg">{news.descripcion}</p>
            </section>

            <section className="py-8 mx-9">
                <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Imágenes
                </h2>
                <div className="grid grid-cols-12 gap-4">
                    {news.recursos_multimedia.map((image, index) => (
                        <Card
                            key={index}
                            className="col-span-12 sm:col-span-4 h-[300px]"
                            onClick={() => window.open(image, "_blank")}
                        >
                            <Image
                                removeWrapper
                                alt={`Image ${index + 1}`}
                                className="z-0 w-full h-full object-cover hover:scale-110 transition-transform"
                                src={image}
                            />
                        </Card>
                    ))}
                </div>
            </section>

            <section className="sm:py-8 md:py-8 text-primary relative 2xl:py-36 md:px-10    ">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
                    Otras Noticias
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-1 ">
                    {NEWS_DATA.NEWS.slice(0, 4).map((noticia, index) => (
                        <Card
                            key={noticia.ID}
                            onClick={() =>
                                router.push(`/noticias/${noticia.ID.toLowerCase()}`)
                            }
                            isPressable
                            shadow="none"
                            className="relative overflow-hidden w-full max-w-[400px]"
                        >
                            <div className="h-48">
                                <Image
                                    src={noticia.imagen_principal}
                                    alt={noticia.titular}
                                    className="w-screen h-48 object-cover rounded-t-md"
                                />
                            </div>

                            <CardBody className="text-center py-4">
                                <Chip color="primary" className="mb-2">
                                    {noticia.etiqueta}
                                </Chip>
                                <h3 className="md:text-md text-lg font-bold mb-2 line-clamp-2">
                                    {noticia.titular}
                                </h3>
                                <p className="text-xs line-clamp-3">{noticia.ENTRADA}</p>
                            </CardBody>

                            <CardFooter className="flex justify-between items-center h-10">
                                <time className="mb-2 text-xs ml-2">{noticia.fecha}</time>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
    );
}
