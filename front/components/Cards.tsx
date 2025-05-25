import React from 'react';
import { Project } from '@/types/project';

type CardProps = {
  project: Project;
};

export default function Cards({ project }: CardProps) {
  console.log("Image full URL:", `http://localhost:8000/uploads/${project.medias?.[0]?.filePath}`);    return (
        <div className="flex flex-col justify-center gap-2 bg-white shadow-md rounded-lg p-4 m-2 h-auto hover:scale-105 transition-transform duration-300">
        <div>
            <img
                src={`http://localhost:8000/uploads/${project.medias?.[0]?.filePath}`}
                alt={project.title}
                className="block object-cover w-full rounded-lg"
            />
        </div>
        <div className="flex flex-col justify-between gap-2 my-2">
            <h2 className="font-semibold text-lg">{project.title}</h2>
            <p className="text-sm text-gray-600">{project.details}</p>
            <a
            className="focus:outline-offset-2 bg-orange-500 w-fit p-2 font-semibold rounded text-white text-sm"
            href={project.link}
            rel="noopener noreferrer"
            >
            En savoir plus
            </a>
        </div>
        </div>
    );
}