"use client"

import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import NEWS_DATA from "@/locales/noticias.json";
import { Image, Card, Button, Chip } from "@nextui-org/react";

export default function NewsPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const news = NEWS_DATA.DATA.find((item) => item.ID === id);

  if (!news) {
    return (
      <main className="min-h-screen">
        <p>News not found!</p>
      </main>
    );
  }

  const mailTo = () => {
    const subject = `Regarding: ${news.titular}`;
    const body = "Please provide more information about this news article.";
    const mailtoLink = `mailto:support@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen px-20">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-9 sm:px-12 py-6 mx-auto">
        <div>
          <Image
            shadow="none"
            src={news.imagen_principal}
            alt={news.titular}
          />
        </div>
        <div className="flex flex-col justify-center items-start py-8">
          <Chip size="sm" className="mb-2 max-w-full">
            {news.etiqueta}
          </Chip>
          <h1 className="text-4xl font-bold mb-2 text-balance">
            {news.titular}
          </h1>
          <p className="text-gray-700 mb-4 text-lg">{news.ENTRADA}</p>
        </div>
      </section>

      <section className="py-6">
        <h2 className="text-3xl font-bold my-4 text-primary">
          Detalles de la noticia
        </h2>
        {news.cuerpo.map((parrafo, index) => (
          <p key={index} className="text-lg text-pretty mb-4">
            {parrafo}
          </p>
        ))}
        <p className="text-lg text-pretty mb-4">{news.cierre}</p>
        <p className="text-lg text-pretty mb-4">{news.firma}</p>
      </section>

      <section className="py-8">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Galería de imágenes
        </h2>
        <div className="grid grid-cols-12 gap-4">
          {news.recursos_multimedia.galeria_imagenes.map((image, index) => (
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

      <section className="py-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Otras noticias destacadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {NEWS_DATA.DATA.map((item) => (
            <Card
              key={item.ID}
              className="col-span-1 h-[200px]"
              onClick={() => router.push(`/news/${item.ID}`)}
            >
              <Image
                removeWrapper
                alt={item.titular}
                className="z-0 w-full h-full object-cover"
                src={item.imagen_principal}
              />
              <div className="p-4">
                <Chip className="mb-2 max-w-full">{item.etiqueta}</Chip>
                <p className="text-sm font-medium">{item.titular}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
