
import Cards from "./Cards";
import React from "react";

import { Project } from "@/types/project"; 

type ProjectsProps = {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (projectId: number) => void; 
  isConnected: boolean
  onToggleVisibility: (project: Project) => void;
};


const Projects: React.FC<ProjectsProps> = ({ projects, onEdit, onDelete,isConnected, onToggleVisibility }) => {
  return (
    <div className =" bg-gray-100 py-6 flex flex-col gap-4 lg:px-18 md:px-10 px-4" id="projects">
      <div className=" flex flex-col justify-center items-center gap-1 py-4">
          <p className=" font-semibold text-sm text-center uppercase"> Découvrez plus</p>
          <p className=" font-bold text-2xl text-center">Visitez nos différents projets </p>
          <p className=" font-normal text-md text-center text-gray-600 lg:w-1/2 md:w-1/2  w-full">Nos étudiants travaillent sur des projets réels afin de mettre en avant leur compétences et leur créativité.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.filter((p) => p.visibility || isConnected).length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg py-8">
            Aucun projet à afficher.
          </p>
        ) : (
          projects
            .filter((p) => p.visibility || isConnected)
            .map((project) => (
              <Cards
                key={project.id}
                project={project}
                onEdit={onEdit}
                onDelete={() => onDelete(project.id)}
                isConnected={isConnected}
                onToggleVisibility={onToggleVisibility}
              />
            ))
        )}
      </div>
    </div>
  );
};

export default Projects;