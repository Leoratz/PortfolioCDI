"use client";

import { useState } from "react";

export default function Register() {
  const [response, setResponse] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const plainPassword = formData.get("plainPassword") as string;

    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

    const register = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          email: email,
          plainPassword: plainPassword,
        }),
      }
    );

    const data = await register.json();
    if (register.ok) {
      setResponse("Inscription réussie");
    } else {
      console.error(data);
      if (data.description) {
        setResponse(data.description);
      } else {
        setResponse("Echec lors de l'inscription");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute bg-cover bg-center opacity-80">
        <h1 className="text-black font-extrabold flex justify-center m-8 text-3xl">
          Inscription
        </h1>
        {response && <p>{response}</p>}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
        >
          <label htmlFor="email" className="font-semibold mb-1 text-black">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <label
            htmlFor="plainPassword"
            className="font-semibold mb-1 text-black"
          >
            Mot de passe
          </label>
          <input
            type="password"
            name="plainPassword"
            placeholder="Mot de passe"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="bg-orange-500 rounded px-4 py-2 hover:bg-orange-600 transition-colors"
          >
            Inscription
          </button>
        </form>
      </div>
    </div>
  );
}
