<<<<<<< HEAD
"use client";
 
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
 
=======

import React from "react";
import HomePage from "./HomePage"; 
>>>>>>> 485bb513a90424841bbdc9b148bd216777c38b8e
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
 
  // Récupération des projets
  const getProjects = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data.member as Project[]);
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    getProjects();
  }, []);
 
  return (
    <>
<<<<<<< HEAD
      <h1>Liste des projets</h1>
      {/* Affichage des projets */}
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.details}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun projet trouvé</p>
      )}
=======
      <h1>Liste des Projets</h1>
      <HomePage />
>>>>>>> 485bb513a90424841bbdc9b148bd216777c38b8e
    </>
  );
}