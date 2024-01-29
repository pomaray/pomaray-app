"use client"
import { Card, Image, Button, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useState } from "react";
import DESCARGAS_DATA from "@/locales/descargas.json";

export default function DescargasPage() {
  const [descargas, setDescargas] = useState(DESCARGAS_DATA.DESCARGAS);

  return (
    <section className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">Descargas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {descargas.map((descarga) => (
          <Card key={descarga.ID} className="max-w-[17rem]">
          
            <CardHeader>
              <h2 className="text-xl font-bold truncate ml-2">{descarga.NOMBRE}</h2>
            </CardHeader>
            <CardBody>
            <Image
                src={DESCARGAS_DATA.HERO.ICONO}
                alt="PDF Icon"
                className="h-16 w-16 justify-end"
              />
              <p className="text-foreground text-sm">
                <span className="font-bold">Tamaño:</span> {descarga.TAMANO}
              </p>
              <p className="text-foreground text-sm mb-2">
                <span className="font-bold">Visitas:</span> {descarga.VISITAS}
              </p>
              <p className="text-foreground text-sm">
                <span className="font-bold">Fecha Añadido:</span> {descarga.FECHA_AÑADIDO}
              </p>
            </CardBody>
            <CardFooter className="gap-3">
              <Button className="bg-primary text-foreground py-2 px-4">
                Descargar
              </Button>
              <Button className="text-primary">
                Vista Previa
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
