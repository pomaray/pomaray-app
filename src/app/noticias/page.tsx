"use client"
import { Section } from "@/components/ui/Section";
import {
  Card,
  CardBody,
  Image,
  Chip,
  CardFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import tec from "@/locales/noticias.json";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const router = useRouter();
  const dynamicPath = "/noticias";

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const [currentMainNewsIndex, setCurrentMainNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMainNewsIndex((prevIndex) =>
        Math.floor(Math.random() * tec.DATA.length)
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <section className="mb-8 lg:flex lg:items-center lg:justify-center mx-10	">
        <article className="lg:w-1/2 h-32 p-2 rounded-md flex items-center py-9 justify-center mb-9 lg:mb-0 lg:mt-6">
          <Image
            shadow="none"
            src={tec.DATA[currentMainNewsIndex].imagen_principal}
            alt={tec.DATA[currentMainNewsIndex].titular}
            className="w-screen h-[20vh] lg:w-screen lg:h-[40vh] rounded-md object-cover"
          />
        </article>
        <aside className="lg:w-1/2 p-4 flex flex-col justify-center">
          <Chip
            color="primary"
            variant="bordered"
            size="lg"
            className="mb-2 text-ellipsis overflow-hidden"
          >
            {tec.DATA[currentMainNewsIndex].etiqueta}
          </Chip>
          <h1 className="lg:text-4xl text-2xl font-bold mb-2 text-balance">
            {tec.DATA[currentMainNewsIndex].titular}
          </h1>
          <p className="mb-4 text-sm">
            {tec.DATA[currentMainNewsIndex].ENTRADA}
          </p>
        </aside>
      </section>

      <section className="p-8 text-primary">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:px-1 md:px-10">
          {tec.DATA.slice(0, 10).map((noticia, index) => (
            <Card
              key={noticia.ID}
              onClick={() =>
                router.push(`${dynamicPath}/${noticia.ID.toLowerCase()}`)
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
