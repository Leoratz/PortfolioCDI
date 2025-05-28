"use client";

import React from "react";

export default function ProfilePage() {
  // Exemple de données utilisateur (à remplacer par des données dynamiques)
  const user = {
    name: "Alyssa Martin",
    email: "alyssa.martin@email.com",
    role: "Administrateur",
    bio: "Développeuse fullstack passionnée par le web et l’accessibilité.",
  };

  return (
    <main role="main" className="flex items-center justify-center min-h-screen bg-gray-100">
      <section
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        aria-labelledby="profile-title"
      >
        <h1 id="profile-title" className="text-2xl font-bold mb-6 text-center text-black">
          Profil utilisateur
        </h1>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-24 h-24 flex items-center justify-center rounded-full shadow bg-orange-500"
            aria-label={`Avatar de ${user.name}`}
            role="img"
          >
            <span className="text-4xl font-bold text-white">
              {user.name[0]}
            </span>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-black">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-orange-500 font-medium">{user.role}</p>
            <p className="mt-4 text-black">{user.bio}</p>
          </div>
        </div>
      </section>
    </main>
  );
}