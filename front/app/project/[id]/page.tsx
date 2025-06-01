"use client";

import { useEffect, useState } from "react";
import { Project } from "@/types/project";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProjectDetails() {
  const [project, setProject] = useState<Project>();
  const params = useParams();

  const fetchProject = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`
      );
      const data = await res.json();
      setProject(data as Project);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = params.id;
    if (id) {
      fetchProject(Number(id));
    }
  }, [params.id]);

  return (
    <div
      className="flex items-center justify-center bg-gray-100 min-h-full w-full"
      aria-labelledby="project-details-title"
      tabIndex={0}
    >
      <div
        className="bg-white p-4 sm:p-7 rounded shadow-md w-full max-w-4xl my-8"
        aria-label="Détails du projet"
        aria-describedby="project-details-desc"
      >
        <h1
          className="sm:text-2xl text-xl font-bold mb-5 text-center text-black"
          id="project-details-title"
          tabIndex={0}
        >
          {project?.title}
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full flex flex-col gap-4">
            <div>
              <p
                className="text-lg font-semibold text-black mb-1"
                aria-labelledby="desc-label"
              >
                Description :
              </p>
              <p className=" text-black">{project?.details}</p>
            </div>

            <div>
              <p
                className="text-lg font-semibold text-black  mb-1"
                id="tech-label"
              >
                Technologies :
              </p>
              {project?.stack.map((technology) => (
                <div
                  key={technology}
                  className="flex items-center gap-2"
                >
                  <p className=" text-black bg-green-700/15 px-2 py-1 rounded-2xl">
                    {technology}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <p
                className="text-lg font-semibold text-black  mb-1"
                id="students-label"
              >
                Étudiants :
              </p>
              <div
                className="flex flex-col gap-2 text-black"
                aria-labelledby="students-label"
              >
                {project?.students.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between bg-gray-200 p-2 rounded"
                  >
                    <p>
                      {student.lastName} {student.firstName}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p
                className="text-lg font-semibold text-black mb-1 "
                id="year-label"
              >
                Année d&apos;étude au sein de notre établissement : <span className="text-base font-normal">{project?.year}</span></p>
            </div>

            {project?.link && (
              <div>
                <p
                  className="text-lg font-semibold text-black mb-1"
                  id="site-label"
                >
                  Site du projet :
                </p>
                <a
                  href={project?.link}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-labelledby="site-label"
                  tabIndex={0}
                >
                  {project?.link}
                </a>
              </div>
            )}

            <div>
              <p
                className="text-lg font-semibold text-black mb-1"
                id="site-label"
              >
                Galerie :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project?.medias?.map((medium) => (
                  <div key={medium.id}>
                    <Image
                      src={`http://localhost:8000/${medium?.contentUrl}`}
                      alt={project.title}
                      className="block object-cover w-full rounded-lg"
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
