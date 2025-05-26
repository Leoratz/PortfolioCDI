import { useEffect, useState } from "react";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
};

type Props = {
  message: ContactMessage | null;
  onClose: () => void;
  onSave: (updated: ContactMessage) => void;
};

export default function EditContactModal({ message, onClose, onSave }: Props) {
  const [formData, setFormData] = useState<ContactMessage | null>(null);

  useEffect(() => {
    setFormData(message);
  }, [message]);

  if (!message || !formData) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value } as ContactMessage);
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
            className="border rounded p-2"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email :</label>
          <input
            className="border rounded p-2"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="message">Message :</label>
          <textarea
            className="border rounded p-2"
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          />

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">
              Enregistrer
            </button>
            <button type="button" onClick={onClose} className="text-gray-600 hover:underline">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
