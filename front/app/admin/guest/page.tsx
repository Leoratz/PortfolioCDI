"use client";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import EditContactModal from "@/components/EditContactModal";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  message: string;
};

export default function ContactMessagesList() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "Camille Dupont",
      email: "camille@example.com",
      message: "Bonjour, j’aimerais en savoir plus sur l’admission.",
    },
    {
      id: 2,
      name: "Marc Lemoine",
      email: "marc@example.com",
      message: "Comment postuler à votre programme ?",
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const handleDelete = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleUpdate = (updated: ContactMessage) => {
    setMessages(messages.map((msg) => (msg.id === updated.id ? updated : msg)));
  };

  return (
    <main className="p-6 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Messages de contact</h1>
        <p className="text-gray-600">Liste des personnes ayant tenté de nous contacter</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {messages.map((msg) => (
          <article
            key={msg.id}
            className="bg-white p-4 rounded-xl shadow-md border border-orange-500 hover:scale-105 transition-transform"
          >
            <div className="flex justify-end gap-2 mb-2">
              <button onClick={() => setSelectedMessage(msg)} aria-label={`Modifier ${msg.name}`}>
                <AiFillEdit className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              </button>
              <button onClick={() => handleDelete(msg.id)} aria-label={`Supprimer ${msg.name}`}>
                <FaRegTrashAlt className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <p className="text-sm"><strong>Nom :</strong> {msg.name}</p>
            <p className="text-sm"><strong>Email :</strong> {msg.email}</p>
            <p className="text-sm"><strong>Message :</strong> {msg.message}</p>
          </article>
        ))}
      </section>

      {selectedMessage && (
        <EditContactModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onSave={handleUpdate}
        />
      )}
    </main>
  );
}