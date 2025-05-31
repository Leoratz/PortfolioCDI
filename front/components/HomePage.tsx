import React from "react";
import Forms from "@/components/Forms";
import Projects from "@/components/Projects";
import Programs from "@/components/Programs";
import HomePresentation from "@/components/HomePresentation";
import AddButtonFix from "./AddButtonProjects";
import { getToken } from "@/utils/jwt";
import { useAuth } from "@/context/AuthContext";

import { useEffect, useState } from "react";

import { Project } from "@/types/project";

import { FaCode } from "react-icons/fa";
import { MdDataObject } from "react-icons/md";
import { CiMobile2 } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";

export default function HomePage() {
  const { isLogged } = useAuth();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [response, setResponse] = useState("");

  const listPrograms = [
    {
      title: "Fullstack web developpement",
      description: "Formulaire de contact pour les demandes de renseignements ",
      icon: <FaCode />,
    },
    {
      title: "Data Science et IA",
      description: "Formulaire de contact pour les demandes de renseignements",
      icon: <MdDataObject />,
    },
    {
      title: "Cyber sécurité",
      description: "Formulaire de contact pour les demandes de renseignements",
      icon: <GrShieldSecurity />,
    },
    {
      title: "Développement d'applicaiton mobile",
      description: "Formulaire de contact pour les demandes de renseignements",
      icon: <CiMobile2 />,
    },
  ];

  const getProjects = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`
      );
      const data = await res.json();
      console.log("Projects data:", data);
      setProjects(data as Project[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const handleEdit = (project: Project) => {
    setEditedProject(project);
    setIsPopupOpen(true);
  };

  const handleDelete = async (projectId: number) => {
    const confirmDelete = confirm(
      "Êtes-vous sûr(e) de vouloir supprimer ce projet ?"
    );
    if (!confirmDelete) return;

    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setResponse("Projet supprimé avec succès");
        setProjects((prevProjects) =>
          prevProjects.filter((project) => Number(project.id) !== Number(projectId))
        );
      }
    } catch (e) {
      console.error("Error:", e);
      setResponse(
        "Une erreur est survenue lors de la suppression. Veuillez réessayer"
      );
    }
  };

  return (
    <div className="relative">
      <HomePresentation />
      <Programs listPrograms={listPrograms} />
      <Projects
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isConnected={isLogged}
      />
      <Forms />
      {isLogged && (<AddButtonFix />)}
      
    </div>
  );
}
