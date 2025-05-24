import React from 'react';
import Forms from '@/components/Forms';
import Projects from '@/components/Projects';
import Programs from '@/components/Programs';
import HomePresentation from '@/components/HomePresentation';
import AddButtonFix from '@/components/AddButtonFix';
import { FaCode } from "react-icons/fa";
import { MdDataObject } from "react-icons/md";
import { CiMobile2 } from "react-icons/ci";
import { GrShieldSecurity } from "react-icons/gr";

export default function HomePage() { 
    const falseJson = [
        {
            "title": "Architecture web",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact",
            "image": "/images/microprocessor.jpg",
            

        },
        {
            "title": "Fullstack",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact2",
            "year": "Année 2",
            "technologies": ["React", "Next.js"],
            "image": "images/student.avif",
        },
        {
            "title": "Apprendre le SEO",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact2",
            "year": "Année 2",
            "technologies": ["React", "Next.js"],
            "image": "images/microprocessor.jpg",
        },
        {
            "title": "Sécurisé un site web",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact2",
            "year": "Année 2",
            "technologies": ["React", "Next.js"],
            "image": "images/microprocessor.jpg",
        },
    ]
    

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
        <Projects projects={falseJson} />
        <Forms />
        <AddButtonFix />
        </div>
    );
}