"use client";

import { useParams } from 'next/navigation';
import techniquesData, { Technique } from '@/data/techniquesData';

const TechniquePage = () => {
  const { id } = useParams();

  console.log(id)

  const technique: Technique | undefined = techniquesData["informatica"];

  if (!technique) {
    return <p>Técnica no encontrada</p>;
  }

  return (
    <div>
      <h1>{technique.title}</h1>
      <img src={technique.coverImage} alt={`Cover for ${technique.title}`} />
      <section>
        <h2>Perfil</h2>
        <p>{technique.profile}</p>
      </section>
      <section>
        <h2>¿Por qué esta técnica?</h2>
        <p>{technique.whyTechnique}</p>
      </section>
      <section>
        <h2>¿Dónde comenzar?</h2>
        <p>{technique.whereToStart}</p>
      </section>
      <section>
        <h2>¿En qué trabajar?</h2>
        <p>{technique.whatToWork}</p>
      </section>
      <section>
        <h2>Plan de estudios</h2>
        <p>{technique.studyPlan}</p>
      </section>
    </div>
  );
};

export default TechniquePage;
