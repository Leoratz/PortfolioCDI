import React from 'react';
import { Project } from '@/types/project';
import Image from 'next/image';
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";



type CardProps = {
    project: Project;
    onEdit: (project: Project) => void;
    onDelete: () => void;
};

export default function Cards({ project, onEdit, onDelete }: CardProps) {
//   console.log("Image full URL:", `http://localhost:8000/uploads/${project.medias?.[0]?.filePath}`);
  return (
        <div className="flex flex-col justify-center gap-2 bg-white shadow-md rounded-lg p-4 m-2 h-auto hover:scale-105 transition-transform duration-300">
            <div className="absolute w-1/2 bg-white p-10 rounded-lg flex flex-col gap-8">
                <button 
                onClick={() => onEdit(project)}
                className="w-full flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Modifier le projet">
                    <AiFillEdit className="h-6 w-6" />
                </button>
                <button  
                onClick={onDelete}
                className="w-full flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="supprimer le projet">
                    <FaRegTrashAlt className="h-6 w-6" />
                </button>
             </div>
            <div>
                <Image
                    src={`http://localhost:8000/uploads/${project.medias?.[0]?.filePath}`}
                    alt={project.title}
                    className="block object-cover w-full rounded-lg"
                    width={500}
                    height={500}
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