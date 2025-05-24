
import Cards from "./Cards";

import React from "react";
import Link from "next/link";

// 1. Définir le type directement ici
type Project = {
    title: string;
    details: string;
    link: string;
    image: string;
};

type ProjectsProps = {
  project: Project[];
};

// 2. Utiliser le typage directement dans le composant
const Projects: React.FC<ProjectsProps> = ({ project }) => {
  return (
    <div>
      {/* La div qui reprend le titre et le sous-titre */}
      <div className=" flex flex-col justify-center items-center gap-1 py-4">
          <p className=" font-semibold text-sm text-center"> Découvrez plus</p>
          <p className=" font-bold text-2xl text-center">Visitez nos différents projets </p>
          <p className=" font-normal text-md text-center w-1/2">Nos étudiants travaillent sur des projets réels afin de mettre en avant leur compétences et leur créativité.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {project.map((proj, index) => (
          <Cards
              key={index}
              title={proj.title}
              details={proj.details}
              link={proj.link}
              image={proj.image}
          />
          ))}
      </div>
    
    </div>
  );
};

export default Projects;

