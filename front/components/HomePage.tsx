import React from 'react';
import Forms from '@/components/Forms';
import Projects from '@/components/Projects';
import Programs from '@/components/Programs';
import HomePresentation from '@/components/HomePresentation';
import AddButtonFix from '@/components/AddButtonFix';

import { Project } from '@/types/project';

import { FaCode } from "react-icons/fa";
import { MdDataObject } from "react-icons/md";
import { CiMobile2 } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";

type HomePageProps = {
    projects: Project[];
}

export default function HomePage({ projects }: HomePageProps) { 
    const listPrograms = [
        {
            "title": "Fullstack web developpement",
            "description": "Formulaire de contact pour les demandes de renseignements ",
            "icon": <FaCode />,
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

    return (
        <div className=''>
            <HomePresentation />
            <Programs listPrograms={listPrograms} />
            <Projects projects={projects} />
            <Forms />
            <AddButtonFix />
        </div>
    );
}