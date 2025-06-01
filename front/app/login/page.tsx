"use client";

import { useState } from "react";

import { createCookie } from "@/utils/jwt";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [response, setResponse] = useState<string>("");
  const { setIsLogged } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const register = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/ld+json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    const data = await register.json();
    if (register.ok) {
      const token = data.token;
      createCookie(token);
      setIsLogged(true);
      redirect("/");
    } else {
      console.error(data);
      if (data.message) {
        setResponse(data.message);
      } else {
        setResponse("Echec lors de la connexion");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-full">
      <div
        className="bg-gray-100/80 p-8 rounded-2xl w-sm"
        aria-labelledby="login-title"
      >
        <h1
          id="login-title"
          tabIndex={0}
          className="text-black font-extrabold flex justify-center mb-8 text-3xl"
        >
          Admin Login
        </h1>
        {response && (
          <p
            role="alert"
            aria-live="assertive"
          >
            {response}
          </p>
        )}
        <form
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          aria-describedby="login-desc"
          aria-label="Formulaire de connexion administrateur"
        >
          <div className="mb-2 flex flex-col gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-black"
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="bg-white border border-gray-300 rounded px-3 py-2  text-blac focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              aria-required="true"
              autoComplete="username"
            />
          </div>

          <div className="mb-1 flex flex-col gap-1">
            <label
              htmlFor="password"
              className="font-semibold mb-1 text-black"
            >
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="bg-white border border-gray-300 rounded px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              aria-required="true"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="text-white border-2 border-orange-500 bg-orange-500 rounded px-4 py-2 hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer"
            aria-label="Se connecter"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}