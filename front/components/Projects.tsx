
import Cards from "./Cards";
import React from "react";

// 1. Définir le type 
type Project = {
    title: string;
    details: string;
    link: string;
    image: string;
};

type ProjectsProps = {
  projects: Project[];
};


const Projects: React.FC<ProjectsProps> = ({projects}) => {
  return (
    <div className =" bg-gray-100 py-6 flex flex-col gap-4">
      {/* La div qui reprend le titre et le sous-titre */}
      <div className=" flex flex-col justify-center items-center gap-1 py-4">
          <p className=" font-semibold text-sm text-center uppercase"> Découvrez plus</p>
          <p className=" font-bold text-2xl text-center">Visitez nos différents projets </p>
          <p className=" font-normal text-md text-center text-gray-600 w-1/2">Nos étudiants travaillent sur des projets réels afin de mettre en avant leur compétences et leur créativité.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
          <Cards
              key={index}
              title={project.title}
              details={project.details}
              link={project.link}
              image={project.image}
          />
          ))}
      </div>
    </div>
  );
};

export default Projects;

