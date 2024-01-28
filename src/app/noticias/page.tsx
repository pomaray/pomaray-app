"use client"
import { useRouter } from "next/navigation";
import tec from "@/locales/noticias.json";
import { Section, SectionTitle } from "@/components/ui/Section";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Avatar,
  Chip,
} from "@nextui-org/react";
import { CiCalendar } from "react-icons/ci";
import { FaEye } from "react-icons/fa";

export default function NewsPage() {
	const router = useRouter();
	const dynamicPath = "/noticias";
  
	return (
	  <main>
		<Section className="p-10 text-white">
		  <Image
			src="/banner/8.png"
			alt="Banner"
			className="w-full h-auto rounded-md shadow-lg"
		  />
		</Section>
  
		<Section className="py-10 px-10 text-primary">
		  <SectionTitle withLine text={tec.NOT_TITULO} />
		  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-46px-6 sm:px-10 md:px-10 lg:px-[1rem]">
			{tec.DATA.map((noticia) => {
			  const {
				ID,
				imagen_principal,
				titular,
				ENTRADA,
				fecha,
				vistas,
				etiqueta,
			  } = noticia;
  
			  return (
				<Card
				  key={ID}
				  onClick={() => {
					router.push(`${dynamicPath}/${ID.toLowerCase()}`);
				  }}
				  isPressable
				  shadow="lg"
				  className="hover:transform hover:scale-105 transition-transform relative overflow-hidden w-[40vh]"
				>
				  <div className="h-48">
					<Image
					  src={imagen_principal}
					  alt={titular}
					  className="w-screen h-48 object-cover rounded-t-md"
					/>
				  </div>
  
				  <CardBody className="text-center py-6">
					<div className="mb-4">
					  <Chip color="primary">{etiqueta}</Chip>
					</div>
					<h3 className="md:text-md text-lg font-bold mb-2">
					  {titular}
					</h3>
					<p className="text-sm">{ENTRADA}</p>
				  </CardBody>
  
				  <CardFooter className="flex justify-between items-center h-12">
					<div className="flex items-center space-x-2">
					  <Avatar icon={<CiCalendar />} />
					  <span className="text-xs">{fecha}</span>
					</div>
					<div className="flex items-center space-x-2">
					  <Avatar icon={<FaEye />} />
					  <span className="text-xs">{vistas}</span>
					</div>
				  </CardFooter>
				</Card>
			  );
			})}
		  </div>
		</Section>
	  </main>
	);
  }