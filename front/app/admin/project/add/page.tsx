"use client";

// import { Student } from "@/types/student";
import { use, useEffect, useState } from "react"; // rajouter useEffect pour le fetch
import { getToken } from "@/utils/jwt";
import { getData } from "@/actions/getData";


export default function AddProject() {

  const [data, setData] = useState<{ users: any; guests: any; projects: any; students: any; medias: any; } | null>(null);

  const [response, setResponse] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const datas = async () => {
    const data = await getData();
    setData(data);
    console.log(data)
  };

  useEffect(() => {
    datas();
  }
  , []);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const token = getToken();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);


        const upload = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`, { 
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // Envois du token
          },
          body: formData,
        })

        const result = await upload.json();
        console.log(result);
        if (upload.status === 201) {
          console.log("Upload réussi", result);
          setMedia(
            (prevMedia) => {
              if (prevMedia) {
                return [...prevMedia, result.media.id];
              } else {
                return [result.media.id];
              }
            }
          );
        } else {
          console.error("Erreur lors de l'upload");
        }
      }
      console.log(formData);


    }

  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(media)
    const token = await getToken();
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const details = formData.get("details") as string;
    const students = formData.getAll("students") as string[];
    const year = Number(formData.get("year"));
    const stack = formData.getAll("stack") as string[];
    const link = formData.get("link") as string;
    const images = media

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      method: "POST",
      headers: {
          "Content-Type": "application/ld+json",
          "Authorization": `Bearer ${token}`, // Envois du token
      },
      body: JSON.stringify({
        title: title,
        details: details,
        students: students,
        year: year,
        stack: stack,
        link: link,
        medias: images,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setResponse("Projet ajouté avec succès");
    } else {
      console.error(data);
      if(data.description){
        setResponse(data.description);
      } else {
        setResponse("Echec lors de la création du projet");
      }
    }
  }

  let options = [];

  if(data?.students){
    options = data.students.map((student: any) => ({
        value: student["@id"],
        label: `${student.lastName} ${student.firstName}`
      })) 
  }

  console.log(options.map(opt => opt.value));
      
  
  const [selectedValues, setSelectedValues] = useState<string[]>([]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div>
        <h1 className="text-black font-extrabold flex justify-center m-8 text-3xl">
          Ajout d&apos;un projet
        </h1>
        <form  method="POST" onSubmit={handleSubmit} className="flex flex-col gap-3">
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
            className="border border-gray-300 rounded px-3 py-2 text-black"
          >
            {data?.students.length === 0 && (
              <option value="" disabled className="text-black">
                Aucun étudiant trouvé
              </option>
            )}
            {data?.students.map((student: any) => (
              <option value={student["@id"]} key={student.id} className="text-black">
                {student.lastName} {student.firstName}
              </option>
            ))}
          </select>
          <select
            id="students"
            className="border border-gray-300 rounded px-3 py-2 text-black"
          >
            {data?.students.length === 0 && (
              <option value="" disabled className="text-black">
                Aucun étudiant trouvé
              </option>
            )}
            {data?.students.map((student: any) => (
              <option value={student["@id"]} key={student.id} className="text-black">
                {student.lastName} {student.firstName}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="year" className="text-black">
            Année d&apos;étude
          </label>
          <select
            id="year"
            name="year"
            className="border border-gray-300 rounded px-3 py-2 text-black"
          >
            <option value={1} className="text-black">
              1ère année
            </option>
            <option value={2} className="text-black">
              2ème année
            </option>
            <option value={3} className="text-black">
              3ème année
            </option>
            <option value={4} className="text-black">
              4ème année
            </option>
            <option value={5} className="text-black">
              5ème année
            </option>
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
            onChange={handleFile}
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
      </div>
    </div>
  );
}
