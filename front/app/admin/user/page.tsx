"use client";

import AdminsList from "@/components/AdminsList";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/jwt";
import { getData } from "@/actions/getData";
import EditUserModal from "@/components/EditUserModal";
import { useRouter } from "next/navigation";

export default function AdminsPage() {
  const [data, setData] = useState<{ users: User[] } | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [response, setResponse] = useState("");

  const router = useRouter();

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

  const handleUpdate = async (updatedUser: User) => {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${updatedUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            plainPassword: updatedUser.plainPassword,
            roles: selectedRoles
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponse("Utilisateur mis à jour avec succès");
  
        setData((prev) =>
          prev
            ? {
                ...prev,
                users: prev.users.map((user) =>
                  user.id === updatedUser.id ? { ...user, ...updatedUser } : user
                ),
              }
            : null
        );
  
        setEditingUser(null);
      } else {
        console.error(data);
        setResponse(data.description || "Echec lors de la création du projet");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Une erreur est survenue");
    }
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
      <div className="flex flex-col sm:flex-row justify-between items-center m-8 gap-4 px-2 sm:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-orange-600 tracking-tight">
          Gestion des utilisateurs
        </h1>
        <button
          onClick={() => router.push("/admin/students/add")}
          className="flex items-center gap-2 text-white bg-orange-500 py-2 px-6 rounded-full font-semibold shadow hover:bg-orange-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un étudiant
        </button>
        <button
          onClick={() => router.push("/admin/user/add")}
          className="flex items-center gap-2 text-white bg-orange-500 py-2 px-6 rounded-full font-semibold shadow hover:bg-orange-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Ajouter un administrateur
        </button>
      </div>

      <AdminsList admins={data?.users} onEdit={handleEdit} onDelete={handleDelete} />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={(updatedUser) => handleUpdate(updatedUser)}
          setSelectedRoles={setSelectedRoles}
          response={response}
        />
      )}
    </div>
  );
}
