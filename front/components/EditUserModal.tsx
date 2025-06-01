"use client";

import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { User } from "@/types/user";
import { Select } from "antd";

type Props = {
  user: User;
  onClose: () => void;
  onSave: (updated: User) => void;
  setSelectedRoles: Dispatch<SetStateAction<string[]>>;
  response: string | null
};

export default function EditUserModal({ user, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<User>({ ...user });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as User);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4 text-orange-500">
          Modifier un utilisateur
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Prénom</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              name="plainPassord"
              value={formData.plainPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Tapez votre nouveau mot de passe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Rôles</label>
            <Select
              id="roles"
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              className="custom-select"
              placeholder="Sélectionnez les rôles à associer"
              options={[
                { value: 'ROLE_USER', label: 'Utilisateur' },
                { value: 'ROLE_ADMIN', label: 'Administrateur' },
              ]}
              defaultValue={user.roles}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
