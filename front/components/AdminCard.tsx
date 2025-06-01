"use client";

import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { User } from "@/types/user";
import { useEffect } from "react";

type AdminCardProps = {
  admin: User;
  onEdit: (admin: User) => void;
  onDelete: (id: number) => void;
};

const AdminCard: React.FC<AdminCardProps> = ({ admin, onEdit, onDelete }) => {
  useEffect(() => {
    console.log(admin);
  });

  return (
    <article
      className=" flex flex-col justify-between gap-3 bg-white rounded-2xl shadow-lg p-6 border border-orange-500 hover:scale-105 transition-transform duration-300"
      aria-label={`Informations de l'administrateur ${admin.firstName} ${admin.lastName}`}
    >
      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(admin)}
          aria-label={`Modifier ${admin.firstName} ${admin.lastName}`}
          className="focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-full"
        >
          <div className="group bg-gray-700 border border-gray-700 p-1.5 rounded-md hover:bg-white focus:bg-white transition-colors duration-200 hover:cursor-pointer">
            <AiFillEdit className="h-6 w-6 text-white group-hover:text-gray-700 group-focus:text-gray-700 transition-colors duration-200" />
          </div>
        </button>
        <button
          onClick={() => onDelete(admin.id)}
          aria-label={`Supprimer ${admin.firstName} ${admin.lastName}`}
          className="focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full"
        >
          <div className="group bg-red-600 border border-red-600 p-1.5 rounded-md hover:bg-white focus:bg-white transition-colors duration-200 hover:cursor-pointer">
            <FaRegTrashAlt className="h-6 w-6 text-white group-hover:text-red-600 group-focus:text-red-600 transition-colors duration-200" />
          </div>
        </button>
      </div>
      <div className="text-beige-800 text-sm sm:text-base">
        <p>
          <span className="font-semibold text-gold-700">Nom :</span>{" "}
          {admin.lastName}
        </p>
        <p>
          <span className="font-semibold text-gold-700">Prénom :</span>{" "}
          {admin.firstName}
        </p>
        <p>
          <span className="font-semibold text-gold-700">Email :</span>{" "}
          {admin.email}
        </p>
        <p>
          <span className="font-semibold text-gold-700">Rôles :</span>{" "}
          {admin.roles
            .map((role) => {
              if (role === "ROLE_USER") return "Utilisateur";
              if (role === "ROLE_ADMIN") return "Administrateur";
              return role;
            })
            .join(", ")}
        </p>
      </div>
    </article>
  );
};

export default AdminCard;
