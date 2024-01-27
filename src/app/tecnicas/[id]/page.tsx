"use client";

import { useParams } from 'next/navigation';
import tech from '@/locales/tech.json';
import { Image, Card, CardHeader, CardBody, Button, Chip, Spacer } from "@nextui-org/react";
import { Section } from '@/components/ui/Section';

export default function TechniquePage() {
  const { id } = useParams<{ id: string }>();

  const technique = tech[id as keyof typeof tech];

  const handleInformationRequest = () => {
    const subject = `Solicitud de información - ${technique.TITULO}`;
    const body = `¡Hola!\n\nMe gustaría obtener más información sobre la técnica de ${technique.TITULO}.\n\nGracias.`;
    const mailtoLink = `mailto:correo@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  if (!technique) {
    return <p>Técnica no encontrada</p>;
  }

  return (
    <main className="min-h-screen">
      <aside className="container mx-auto p-2 flex">
        <div className=" rounded-lg shadow-lg overflow-hidden flex-grow">
          <Section className="relative h-90">
            <Image
              src={technique.COVER_IMAGE}
              alt={id.toString()}
              className="w-full h-full object-cover object-center"
              classNames={{
                img: "w-full h-full object-cover !rounded-none",
                wrapper: "!max-w-full !rounded-none"
              }}
            />
          </Section>

          <Section className="flex items-center">
            <div className="flex flex-col justify-center items-start p-8 w-full md:w-[80%]">
              <Chip className="mb-2">{technique.ID}</Chip>
              <h1 className="text-4xl font-bold mb-2">{technique.TITULO}</h1>
              <p className="text-gray-700 mb-4">{technique.PROFILE[0]}</p>
              <Spacer y={2} />
              <div className="flex space-x-4">
                <Button color="primary">
                  Descargar Folleto
                </Button>
                <Button onClick={handleInformationRequest} color="primary" variant="bordered">
                  Solicitar Información
                </Button>
              </div>
            </div>
          </Section>

          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Oportunidades Profesionales</h2>
              <p className="text-gray-700 mx-auto">{technique.WHAT_TOWORK}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Tu camino de estudio</h2>
              <p className="text-gray-700 mx-auto">{technique.STUDY_PLAN}</p>
            </section>
            
            </div>
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Galería de Imágenes</h2>
              <div className="grid grid-cols-12 gap-4">
                {technique.IMAGENES.map((image, index) => (
                  <Card key={index} className="col-span-12 sm:col-span-4 h-[300px]">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start"></CardHeader>
                    <Image
                      removeWrapper
                      alt={`Image ${index + 1}`}
                      className="z-0 w-full h-full object-cover"
                      src={image}
                    />
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </aside>
    </main>
  );
};

