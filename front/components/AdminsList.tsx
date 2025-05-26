import React from "react";
import AdminCard from "./AdminCard";
import { User } from "@/types/user";

type AdminsListProps = {
  admins: User[];
  onEdit: (admin: User) => void;
  onDelete: (adminId: number) => void;
};

const AdminsList: React.FC<AdminsListProps> = ({ admins, onEdit, onDelete }) => {
  return (
    <div
      className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-gray-100"
      aria-label="Liste des administrateurs"
    >

      {admins.map((admin) => (
        <AdminCard
          key={admin.id}
          admin={admin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AdminsList;
