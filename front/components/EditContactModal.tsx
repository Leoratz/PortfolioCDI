import { useEffect, useState } from "react";
import { Guest } from "@/types/guest";

type Props = {
  message: Guest | null;
  onClose: () => void;
  onSave: (updated: Guest) => void;
};

export default function EditContactModal({ message, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<Guest | null>(null);

  useEffect(() => {
    setFormData(message);
  }, [message]);

  if (!message || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as Guest);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-orange-500">Modifier le message</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="name">Nom :</label>
          <input
            className="border rounded p-2 bg-gray-100"
            type="text"
            value={formData.lastName}
            disabled
          />
          <label>Prénom :</label>
          <input
            className="border rounded p-2 bg-gray-100"
            type="text"
            value={formData.firstName}
            disabled
          />

          <label>Email :</label>
          <input
            className="border rounded p-2 bg-gray-100"
            type="email"
            value={formData.email}
            disabled
          />

          <label>Message :</label>
          <textarea
            className="border rounded p-2 bg-gray-100"
            value={formData.details}
            disabled
          />

          <label htmlFor="status">Statut :</label>
          <select
            className="border rounded p-2"
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">En attente</option>
            <option value="onGoing">En cours</option>
            <option value="done">Traité</option>
          </select>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-white focus:bg-white hover:text-orange-500 focus:text-orange-500 transition-colors duration-200 cursor-pointer border border-orange-500 text-white ">
              Enregistrer
            </button>
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline cursor-pointer">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
