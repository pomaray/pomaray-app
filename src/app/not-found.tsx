'use client'
import { Section, SectionTitle } from "@/components/ui/Section"
import { TbError404Off } from "react-icons/tb";
import { Button, Link } from "@nextui-org/react";

export default function NotFound() {
    return (
        <Section className="flex flex-col items-center justify-center h-[80dvh] text-foreground text-center gap-8">
            <TbError404Off className="text-[200px] text-primary"/>
            <SectionTitle text="La pagina la que buscas no existe." />
            <p className="text-lg max-w-[50ch]">
                Lo sentimos, la página que estabas buscando no existe.
                Intenta ir a <Link href={"/"}>la pagina principal</Link> o síguenos en.
            </p>
            <a href="/">
                <Button color="primary">
                    Volver a inicio
                </Button>
            </a>
        </Section>
    );
}
