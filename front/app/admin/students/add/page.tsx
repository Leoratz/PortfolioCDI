"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/jwt";

export default function AddStudent() {
  const router = useRouter();

  const [form, setForm] = useState({
  lastName: "",
  firstName: "",
  github: "",
});

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = await getToken(); 
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/admin/user"); 
      } else {
        alert("Erreur lors de l'ajout de l'étudiant.");
      }
    } catch (error) {
      console.error("Erreur d'ajout :", error);
      alert("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4 py-8">
      <section
        className="bg-white p-8 rounded shadow-md w-full max-w-2xl flex flex-col justify-center"
        aria-labelledby="add-student-title"
      >
        <h1
          id="add-student-title"
          className="text-black font-extrabold text-center mb-8 text-2xl"
        >
          Ajouter un étudiant
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          autoComplete="off"
        >
          <div>
            <label htmlFor="lastName" className="text-black font-semibold block">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="firstName" className="text-black font-semibold block">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="github" className="text-black font-semibold block">
              GitHub
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={form.github}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 rounded px-4 py-2 hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer border border-orange-500 text-white"
          >
            {loading ? "Ajout en cours..." : "Ajouter"}
          </button>
        </form>
      </section>
    </main>
  );
}