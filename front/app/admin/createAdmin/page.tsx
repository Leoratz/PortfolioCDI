"use client";

import React, { useState } from "react";

const initialProfiles = [
  {
    id: 1,
    name: "Alyssa Martin",
    email: "alyssa.martin@email.com",
    isAdmin: true,
  },
  {
    id: 2,
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    isAdmin: false,
  },
  {
    id: 3,
    name: "Marie Curie",
    email: "marie.curie@email.com",
    isAdmin: false,
  },
];

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState(initialProfiles);

  const handleSetAdmin = (id) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === id ? { ...profile, isAdmin: true } : profile
      )
    );
  };

  return (
    <main
      role="main"
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <section
        className="bg-white p-8 rounded shadow-md w-full max-w-2xl"
        aria-labelledby="profiles-title"
      >
        <h1
          id="profiles-title"
          className="text-2xl font-bold mb-6 text-center text-black"
        >
          Liste des profils
        </h1>
        <ul className="divide-y divide-gray-200">
          {profiles.map((profile) => (
            <li
              key={profile.id}
              className="flex items-center justify-between py-4"
            >
              <div>
                <p className="text-lg font-semibold text-black">
                  {profile.name}
                </p>
                <p className="text-gray-600">{profile.email}</p>
                {profile.isAdmin && (
                  <span className="text-xs text-white bg-orange-500 rounded px-2 py-1 ml-2">
                    Admin
                  </span>
                )}
              </div>
              {!profile.isAdmin && (
                <button
                  onClick={() => handleSetAdmin(profile.id)}
                  className="bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors"
                  aria-label={`Mettre ${profile.name} administrateur`}
                >
                  Mettre admin
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
