"use client";

import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { User } from "@/types/user";

type AdminCardProps = {
  admin: User;
  onEdit: (admin: User) => void;
  onDelete: (id: number) => void;
};

const AdminCard: React.FC<AdminCardProps> = ({ admin, onEdit, onDelete }) => {
  return (
    <article
      className=" flex flex-col justify-between gap-3 bg-white rounded-2xl shadow-lg p-6 border border-orange-500 hover:scale-105 transition-transform duration-300"
      aria-label={`Informations de l'administrateur ${admin.firstname} ${admin.lastname}`}
    >
      <div className="flex justify-end gap-3">
        <button
          onClick={() => onEdit(admin)}
          aria-label={`Modifier ${admin.firstname} ${admin.lastname}`}
          className="focus:outline-none focus:ring-2 focus:ring-orange-300 rounded-full"
        >
          <AiFillEdit className="h-6 w-6 text-orange-600 hover:text-orange-500" />
        </button>
        <button
          onClick={() => onDelete(admin.id)}
          aria-label={`Supprimer ${admin.firstname} ${admin.lastname}`}
          className="focus:outline-none focus:ring-2 focus:ring-red-300 rounded-full"
        >
          <FaRegTrashAlt className="h-6 w-6 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      <div className="text-beige-800 text-sm sm:text-base">
        <p><span className="font-semibold text-gold-700">Nom :</span> {admin.lastname}</p>
        <p><span className="font-semibold text-gold-700">Prénom :</span> {admin.firstname}</p>
        <p><span className="font-semibold text-gold-700">Email :</span> {admin.email}</p>
        <p><span className="font-semibold text-gold-700">Mot de passe :</span> {admin.password}</p>
        <p><span className="font-semibold text-gold-700">Rôles :</span> {admin.roles.join(', ')}</p>
      </div>
    </article>
  );
};

export default AdminCard;