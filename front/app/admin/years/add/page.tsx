"use client";

// import { getToken } from "@/utils/jwt";
import { useState } from "react";

export default function AddCategoryYear() {
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Récupération du token
    // const token = await getToken();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/years`,
      {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/ld+json",
        //     "Authorization": `Bearer ${token}`, // Envois du token
        // },
        body: JSON.stringify({
          name: name,
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      setResponse("Catégorie Year ajoutée avec succès");
    } else {
      console.error(data);
      if (data.description) {
        setResponse(data.description);
      } else {
        setResponse("Echec lors de la création de la catégorie Year");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="absolute bg-cover bg-center opacity-80">
          <h1 className="text-black font-extrabold flex justify-center m-8 text-2xl">
            Ajout d&apos;une catégorie
          </h1>
          {response && <p>{response}</p>}
          <form
            method="POST"
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <label htmlFor="name" className="text-black">Année</label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded px-3 py-2  text-blac focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="submit"
              className="bg-orange-500 rounded px-4 py-2 hover:bg-orange-600 transition-colors"
            >
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
