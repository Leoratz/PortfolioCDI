"use client";

import AdminsList from "@/components/AdminsList";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/jwt";
import { getData } from "@/actions/getData";

const AdminsPage = () => {
  const [data, setData] = useState<{users: User[];} | null>(null);
  
    const datas = async () => {
        const data = await getData();
        setData(data);
      };
    
      useEffect(() => {
        datas();
      }, []);


  const handleEdit = (admin: User) => {
    console.log("Modifier", admin);
  };

  const handleDelete = (id: number) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-gold-700 mb-6">Gestion des administrateurs</h1>
      <AdminsList admins={data?.users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminsPage;