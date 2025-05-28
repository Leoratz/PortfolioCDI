import React from 'react';
import Forms from '@/components/Forms';
import Projects from '@/components/Projects';
import Programs from '@/components/Programs';
import HomePresentation from '@/components/HomePresentation';
import AddButtonFix from '@/components/AddButtonProjects';
import AddProjectsPage from '@/components/AddProjectsPage';

import { useEffect, useState } from "react";

import { Project } from '@/types/project';

import { FaCode } from "react-icons/fa";
import { MdDataObject } from "react-icons/md";
import { CiMobile2 } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";

export default function HomePage() { 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);
    const listPrograms = [
        {
            "title": "Fullstack web developpement",
            "description": "Formulaire de contact pour les demandes de renseignements ",
            "icon": <FaCode />
        },
        {
            "title": "Data Science et IA",
            "description": "Formulaire de contact pour les demandes de renseignements",
            "icon": <MdDataObject />,
        },
        {
            "title": "Cyber sécurité",
            "description": "Formulaire de contact pour les demandes de renseignements",
            "icon": <GrShieldSecurity />,
        },
        {
            "title": "Développement d'applicaiton mobile",
            "description": "Formulaire de contact pour les demandes de renseignements",
            "icon": <CiMobile2 />,
        },
    ]

    const getProjects = async () => {
        try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
          const data = await res.json();
          setProjects(data as Project[]);
        } catch (error) {
          console.error(error);
        }
      };
     
      useEffect(() => {
        getProjects();
      }, []);

    const [editedProject, setEditedProject] = useState<Project | null >(null); 
    const handleEdit = (project: Project) => {
        setEditedProject(project);
        setIsPopupOpen(true);
    };


    const handleDelete = async (projectId: number) => {
    const confirmDelete = confirm("Es-tu sûr de vouloir supprimer ce projet ?");
        if (!confirmDelete) return;
        //TODO: delete project en back
    };

    return (
        <div className='relative'>
            <HomePresentation />
            <Programs listPrograms={listPrograms} />
            <Projects 
            projects={projects} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
            />
            <Forms />
            <AddButtonFix onClick={() => setIsPopupOpen(true)} />
            { isPopupOpen && (
                <AddProjectsPage 
                onClose ={() => 
                {setIsPopupOpen(false); 
                setEditedProject(null);
                }}
                project={editedProject}
                />
            )}
        </div>
    );
}