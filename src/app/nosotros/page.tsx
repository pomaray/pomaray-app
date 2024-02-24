"use client"
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { HistoryTimeline } from "@/components/ui/Timeline";
import { Divider } from "@nextui-org/divider";
import i18n from "@/locales/nosotros.json";

export default function NosotrosPage() {
  return (
    <motion.article
      initial={{
        translateY: 100,
        opacity: 0,
      }}
      animate={{
        translateY: 0,
        opacity: 1,
      }}
      className="container mx-auto px-6 sm:px-12 py-12 bg-gray-100"
    >
      <div className="text-center mb-8">
        <Logo className="inline-block fill-primary mb-4" width={80} />
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2">
          {i18n.HERO.TITLE}
        </h1>
        <p className="text-lg text-gray-600">{i18n.HERO.SUBTITLE}</p>
      </div>
      
      <section>
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <HistoryTimeline points={i18n.TIME_LINE} />
        </div>
      </section>

      {i18n.CONTENT.map((sec) => (
        <section key={sec.TITLE} className="mt-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
            {sec.TITLE}
          </h2>
          <Divider className="bg-primary h-1 rounded-full mb-6" />
          <div className="max-w-3xl mx-auto">
            {sec.PARAGRAPHS.map((parag, paragIndex) => {
              const isList = parag.substring(0, 2).trim() === "-";
              const isLastList =
                sec.PARAGRAPHS[paragIndex - 1] &&
                sec.PARAGRAPHS[paragIndex - 1].substring(0, 2).trim();

              if (isList) {
                return (
                  <li className="py-2 list-disc" key={parag}>
                    {parag.replace("-", "")}
                  </li>
                );
              }

              return (
                <p
                  className={`text-lg text-gray-700 ${
                    isLastList && "pt-4"
                  }`}
                  key={parag}
                >
                  {parag}
                </p>
              );
            })}
          </div>
        </section>
      ))}
    </motion.article>
  );
}
