
import Cards from "./Cards";
import React from "react";

import { Project } from "@/types/project"; 

import Link from "next/link";

type ProjectsProps = {
  projects: Project[];
};


const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <div className =" bg-gray-100 py-6 flex flex-col gap-4 px-18 ">
      <div className=" flex flex-col justify-center items-center gap-1 py-4">
          <p className=" font-semibold text-sm text-center uppercase"> Découvrez plus</p>
          <p className=" font-bold text-2xl text-center">Visitez nos différents projets </p>
          <p className=" font-normal text-md text-center text-gray-600 w-1/2">Nos étudiants travaillent sur des projets réels afin de mettre en avant leur compétences et leur créativité.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/project/${project.id}`} key={project.id} className="block bg-white rounded shadow p-4 hover:bg-orange-50 transition">
            <Cards
              title={project.title}
              description={project.details}
              image={project.image}
              stack={project.stack}
              students={project.student}
              liensite={project.link}
            />
          </Link> 
        ))}
      </div>
    </div>
  );
};

export default Projects;