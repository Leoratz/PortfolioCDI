"use client";

// import { Student } from "@/types/student";
import { projects as localProjects } from "@/projects.json";
import { useState } from "react"; // rajouter useEffect pour le fetch
// import { getToken } from "@/utils/jwt";

export default function AddProject() {
  const [projects] = useState(localProjects);
  //   const [projects, setProjects] = useState(localProjects);

  //   const fetchCategories = async () => {
  //         const token = await getToken();
  //         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
  //             headers: {
  //                 "Authorization": `Bearer ${token}`,
  //             },
  //         });
  //         const data = await response.json();
  //         setCategories(data.member as Category[]);
  //     };

  //     useEffect(() => {
  //         fetchCategories();
  //     }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h1 className="text-black font-extrabold flex justify-center m-8 text-3xl">
          Ajout d&apos;un article
        </h1>
        {projects.length > 0 && (
          <form method="POST" className="flex flex-col gap-3">
            <label htmlFor="title" className="text-black">
              Titre
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded px-3 py-1 text-black "
            />
            <br />
            <label htmlFor="details" className="text-black">
              Description
            </label>
            <textarea
              id="details"
              name="details"
              className="border border-gray-300 rounded px-3 py-1 text-black focus:outline-none "
            ></textarea>
            <br />
            <label htmlFor="students" className="text-black">
              Etudiants
            </label>
            <select
              id="students"
              name="students"
              className="border border-gray-300 rounded px-3 py-2 text-black"
            >
              {projects.map((project: any) => (
                <option value={project["@id"]} key={project.id} className="text-black">
                  {project.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="students" className="text-black">
              Année d&apos;étude
            </label>
            <select
              id="students"
              name="students"
              className="border border-gray-300 rounded px-3 py-2 text-black"
            >
              {projects.map((project: any) => (
                <option value={project["@id"]} key={project.id} className="text-black">
                  {project.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="stack" className="text-black">
              Technologies
            </label>
            <input
              type="text"
              id="stack"
              name="stack"
              className="border border-gray-300 rounded px-3 py-1 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <br />
            <label htmlFor="link" className="text-black">
              Lien du projet
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className="border border-gray-300 rounded px-3 py-1 text-black "
            />
            <br />
            <label htmlFor="images" className="text-black">
              Images du projet
            </label>
            <input
              type="file"
              multiple
              id="images"
              name="images"
              className="border border-gray-300 rounded px-3 py-1 text-black "
            />
            <button
              type="submit"
              className="bg-orange-500 rounded px-4 py-1 hover:bg-orange-600 transition-colors"
            >
              Ajouter
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
