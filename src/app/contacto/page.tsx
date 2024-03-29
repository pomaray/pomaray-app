import React from "react";
import { Input, Textarea, Button } from "@nextui-org/react";
import locale from "@/locales/contacto.json";
import { Reveal } from "@/components/ui/ScrollReveal";

export default function ContactoPage() {
  const { HERO, FORMULARIO, INFORMACION_ADICIONAL } = locale;
  return (
    <Reveal>
      <main className="container mx-auto px-6 sm:px-12 py-6">

        <section className="text-center">
          <h1 className="text-5xl font-bold my-4 text-primary">
            {HERO.TITULO}
          </h1>
          <p className="text-pretty mt-2">{HERO.DESCRIPCION}</p>
        </section>

        <section className="flex flex-wrap mt-8">
          <div className="w-full sm:w-1/2 pr-4 pt-8 text-center">
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Horarios</h2>
              <p>{INFORMACION_ADICIONAL.HORARIOS}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Dirección</h2>
              <p>{INFORMACION_ADICIONAL.DIRECCION}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">Soporte</h2>
              <p>
                Correo Electrónico: {INFORMACION_ADICIONAL.SOPORTE.CORREO}
                <br />
                Teléfono: {INFORMACION_ADICIONAL.SOPORTE.TELEFONO}
              </p>
            </div>

          </div>

          <div className="w-full sm:w-1/2 pr-4">
            <h2 className="text-3xl font-bold mb-4 text-center">{FORMULARIO.TITULO}</h2>
            <form className="grid grid-cols-1 gap-6">
              {FORMULARIO.CAMPOS.map((campo) => (
                <div key={campo.ID}>
                  <label className="block text-sm font-medium text-foreground">
                    {campo.TITULO}
                    {campo.REQUERIDO && <span className="text-red-500">*</span>}
                  </label>
                  {campo.TIPO === "areaTexto" ? (
                    <Textarea
                      id={campo.ID}
                      name={campo.ID}
                      rows={4}
                      className="mt-1"
                      required={campo.REQUERIDO}
                    />
                  ) : (
                    <Input
                      type={campo.TIPO}
                      id={campo.ID}
                      name={campo.ID}
                      className="mt-1"
                      required={campo.REQUERIDO}
                    />
                  )}
                </div>
              ))}
              <Button type="submit" color="primary">
                {FORMULARIO.BOTON_ENVIAR.TEXTO}
              </Button>
            </form>

          </div>
          
        </section>
      </main>
    </Reveal>
  );
}
