"use client";

import { useState } from "react";

export default function Profile() {
  const [user] = useState({
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Mon Profil</h1>
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full bg-orange-200 flex items-center justify-center text-4xl font-bold text-orange-600 mb-4">
            {user.name[0]}
          </div>
          <div className="w-full">
            <p className="text-lg font-semibold text-black mb-2">Nom :</p>
            <p className="mb-4">{user.name}</p>
            <p className="text-lg font-semibold text-black mb-2">Email :</p>
            <p className="mb-4">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}