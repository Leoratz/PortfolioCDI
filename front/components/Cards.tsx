import React from "react";
import { Project } from "@/types/project";
import Image from "next/image";
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";

type CardProps = {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: () => void;
  isConnected: boolean;
};

export default function Cards({
  project,
  onEdit,
  onDelete,
  isConnected,
}: CardProps) {
  return (
    <div className="flex flex-col justify-between gap-2 bg-white shadow-md rounded-lg p-4 m-2 h-auto hover:scale-105 transition-transform duration-300">
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
        <div className="flex items-center justify-between">
          <Link
            className="focus:outline-offset-2 bg-orange-500 w-fit p-2 font-semibold rounded text-white text-sm"
            href={`/project/${project.id}`}
            rel="noopener noreferrer"
          >
            En savoir plus
          </Link>
          {isConnected && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => onEdit(project)}
                aria-label="Modifier le projet"
              >
                <div className="bg-gray-700 border border-gray-700 p-1.5 rounded-md hover:bg-white focus:bg-white transition-colors duration-200 hover:cursor-pointer">
                  <AiFillEdit className="h-6 w-6 text-white hover:text-gray-700 focus:text-gray-700 transition-colors duration-200" />
                </div>
              </button>
              <button
                onClick={onDelete}
                aria-label="supprimer le projet"
              >
                <div className="bg-red-600 border border-red-600 p-1.5 rounded-md hover:bg-white focus:bg-white transition-colors duration-200 hover:cursor-pointer">
                  <FaRegTrashAlt className="h-6 w-6 text-white hover:text-red-600 focus:text-red-600 transition-colors duration-200" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
