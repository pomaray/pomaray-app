import { Image } from "@nextui-org/react";

export type CollageContent = {
  TITLE: string;
  CONTENT: string;
  BUTTON_TEXT: string;
  BUTTON_LINK: string;
  IMAGEN_SRC: string;
};


type CollageProps = {
  contentSections: CollageContent[];
  children?: React.ReactNode;
  className?: string;
};

type CollageItemProps = {
  reverse: boolean;
  title: string;
  text: React.ReactNode;
  imgSrc: string;
  className?: string;
};

export function CollageItem({
  reverse,
  title,
  text,
  imgSrc,
  className,
}: CollageItemProps) {
  return (
    <aside className={`grid grid-cols-1 sm:grid-cols-2 ${className}`}>
      <div className={`h-full ${reverse ? 'order-2' : 'order-1'}`}>
        <Image src={imgSrc} alt={title} classNames={
          {
            img: "w-full h-full object-cover !rounded-none",
            wrapper: "!max-w-full h-full !rounded-none"
          }
        } />
      </div>
      <div className={`flex flex-col items-center justify-center p-10  h-full mb-6 ${reverse ? 'sm:order-1 order-2' : 'order-2'}`}>
        <h3 className="text-xl sm:text-3xl font-bold text-white text-center">{title}</h3>
        <p className="text-gray-200 text-center mt-6">{text}</p>
      </div>
    </aside>
  );
}

export function Collage({ contentSections, children, className }: CollageProps) {
  return (
    <section className={`bg-primary h-full flex flex-col ${className}`}>
      {contentSections.map((section, index) => (
        <CollageItem
          key={section.IMAGEN_SRC}
          imgSrc={section.IMAGEN_SRC}
          reverse={index % 2 === 0}
          text={section.CONTENT}
          title={section.TITLE}
        />
      ))}
      {children}
    </section>
  );
}
