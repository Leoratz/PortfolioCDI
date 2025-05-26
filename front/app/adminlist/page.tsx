"use client";

import React, { useState } from "react";
import AdminsList from "@/components/AdminsList";
import { User } from "@/types/user";

const AdminsPage = () => {
  const [admins, setAdmins] = useState<User[]>([
    {
      id: 1,
      lastname: "Dupont",
      firstname: "Jean",
      email: "jean.dupont@example.com",
      password: "******",
      roles: ["admin"],
    },
    {
      id: 2,
      lastname: "Martin",
      firstname: "Claire",
      email: "claire.martin@example.com",
      password: "******",
      roles: ["editor"],
    },
    {
      id: 3,
      lastname: "Martin",
      firstname: "Claire",
      email: "claire.martin@example.com",
      password: "******",
      roles: ["editor"],
    },
  ]);

  const handleEdit = (admin: User) => {
    console.log("Modifier", admin);
  };

  const handleDelete = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <main className="">
      <h1 className="text-xl sm:text-2xl font-bold text-gold-700 mb-6">Gestion des administrateurs</h1>
      <AdminsList admins={admins} onEdit={handleEdit} onDelete={handleDelete} />
    </main>
  );
};

export default AdminsPage;