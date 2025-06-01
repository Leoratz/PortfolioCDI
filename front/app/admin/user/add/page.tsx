"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/jwt";

export default function AddUser() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    plainPassword: "",
    firstName: "",
    lastName: "",
    roles: ["ROLE_USER"],
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.includes("@")) newErrors.email = "Email invalide";
    if (form.plainPassword.length < 4) newErrors.plainPassword = "Mot de passe trop court";
    if (!form.firstName) newErrors.firstName = "Prénom requis";
    if (!form.lastName) newErrors.lastName = "Nom requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponse("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const token = await getToken();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setResponse("Utilisateur créé avec succès.");
        router.push("/admin/user");
      } else {
        console.error(result);
        setResponse("Erreur : " + (result.description || "Échec lors de la création."));
      }
    } catch (error) {
      console.error(error);
      setResponse("Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 w-full min-h-screen">
      <h1 className="text-black font-extrabold text-3xl my-8">Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-8 rounded shadow-md w-full max-w-lg">
        <label className="flex flex-col text-black">
          Email <span className="text-orange-500">*</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`border px-3 py-2 rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </label>

        <label className="flex flex-col text-black">
          Mot de passe <span className="text-orange-500">*</span>
          <input
            type="password"
            name="plainPassword"
            value={form.plainPassword}
            onChange={handleChange}
            className={`border px-3 py-2 rounded ${errors.plainPassword ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.plainPassword && <span className="text-red-500 text-sm">{errors.plainPassword}</span>}
        </label>

        <label className="flex flex-col text-black">
          Prénom <span className="text-orange-500">*</span>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={`border px-3 py-2 rounded ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName}</span>}
        </label>

        <label className="flex flex-col text-black">
          Nom <span className="text-orange-500">*</span>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={`border px-3 py-2 rounded ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
            disabled={loading}
          />
          {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName}</span>}
        </label>

        <button
          type="submit"
          className="bg-orange-500 text-white rounded px-4 py-2 hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer border border-orange-500 text-white"
          disabled={loading}
        >
          {loading ? "Création en cours..." : "Créer l'utilisateur"}
        </button>

        {response && (
          <div
            className={`text-center ${
              response.includes("succès") ? "text-green-500" : "text-red-500"
            }`}
          >
            {response}
          </div>
        )}
      </form>
    </div>
  );
}
