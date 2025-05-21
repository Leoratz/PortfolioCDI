import React from 'react';
import Forms from '@/components/Forms';
import Projects from '@/components/Projects';
export default function HomePage() { 

    const falseJson = [
        {
            "title": "Formulaire de contact",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact",
            "image": "https://example.com/image1.jpg",
            

        },
        {
            "title": "Formulaire de contact 2",
            "details": "Formulaire de contact pour les demandes de renseignements",
            "link": "/contact2",
            "year": "Année 2",
            "technologies": ["React", "Next.js"],
            "image": "https://example.com/image2.jpg",
        },
    ]

    console.log(typeof falseJson);

    return (
        <>
        <Projects project={falseJson} />
        <Forms />
        </>
    );
}