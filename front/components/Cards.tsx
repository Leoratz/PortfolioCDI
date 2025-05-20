
import React from 'react';
import { Project } from '@/types/types';
export default function Cards({ title, details, link, image }: Project) {
    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{details}</p>
            <a href={link} target="_blank" rel="noopener noreferrer">View Project</a>
        </div>
    )
}