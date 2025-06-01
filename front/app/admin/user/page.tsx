"use client";

import AdminsList from "@/components/AdminsList";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/jwt";
import { getData } from "@/actions/getData";
import EditUserModal from "@/components/EditUserModal";

const AdminsPage = () => {
  const [data, setData] = useState<{ users: User[] } | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const datas = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    datas();
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = async (updated: User) => {
    console.log("modified user:", updated);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?");
    if (!confirmDelete) return;

    try {
      const token = await getToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                users: prev.users.filter((user) => user.id !== id),
              }
            : null
        );
      } else {
        throw new Error("Suppression refusée ou échouée");
      }
    } catch (e: any) {
      alert("Vous n'êtes pas autorisé à supprimer cet administrateur.");
      console.error("Erreur lors de la suppression :", e);
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-gold-700 mb-6">Gestion des administrateurs</h1>
      <AdminsList admins={data?.users} onEdit={handleEdit} onDelete={handleDelete} />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
};

export default AdminsPage;
