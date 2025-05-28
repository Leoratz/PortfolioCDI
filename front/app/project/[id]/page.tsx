"use client";

import { useState } from "react";

export default function ProjectDetails() {
  const [project] = useState({
    id: 1,
    name: "Projet Alpha",
    image: (
      <img
        src="https://via.placeholder.com/150"
        alt="Project Image"
        className="w-full h-48 object-cover mb-4 rounded"
      />
    ),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "En cours",
    technologies: "React, Node.js, MongoDB",
    liensite: "https://example.com",
    students: [
      {
        id: 1,
        name: "Jean Dupont",
        year: 4,
      },
      {
        id: 2,
        name: "Marie Curie",
        year: 3,
      },
    ],
  });

  return (
    <div>
      <div
        className="flex items-center justify-center min-h-screen bg-gray-100 mx-auto"
        aria-labelledby="project-details-title"
        tabIndex={0}
      >
        <div 
          className="bg-white p-7 rounded shadow-md w-full max-w-xl" 
          aria-label="Détails du projet"
          aria-describedby="project-details-desc"
        >
          <h1 
            className="text-2xl font-bold mb-5 text-center text-black"
            id="project-details-title"
            tabIndex={0}
          >
            {project.name}
          </h1>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full">
              {project.image}
              <p className="text-lg font-semibold text-black mb-2" aria-labelledby="desc-label">
                Description :
              </p>
              <p className="mb-4 text-black">{project.description}</p>

              <p className="text-lg font-semibold text-black mb-2" id="tech-label">
                Technologies :
              </p>
              <p className="mb-4 text-black">{project.technologies}</p>
              <p className="text-lg font-semibold text-black mb-2" id="students-label">
                Students :
              </p>
              <div className="flex flex-col gap-2 text-black" aria-labelledby="students-label">
                {project.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between bg-gray-200 p-2 rounded"
                  >
                    <p>{student.name}</p>
                    <p>Année {student.year}</p>
                  </div>
                ))}
              </div>
              <p className="text-lg font-semibold text-black mb-2" id="site-label">
                Site du projet :
              </p>
              <a
                href={project.liensite}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-labelledby="site-label"
                tabIndex={0}
              >
                {project.liensite}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
