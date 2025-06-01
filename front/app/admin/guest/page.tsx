"use client";
import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import EditContactModal from "@/components/EditContactModal";
import { getToken } from "@/utils/jwt";
import { Guest } from "@/types/guest";

export default function ContactMessagesList() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [response, setResponse] = useState("");

  const getGuests = async () => {
    try {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/guests`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      console.log("Guests data:", data);
      setGuests(data as Guest[]);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGuests();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Êtes-vous sûr(e) de vouloir supprimer ce message ?"
    );
    if (!confirmDelete) return;

    try {
      const token = await getToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/guests/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setResponse("Message supprimé avec succès");
        setGuests((prevGuests) =>
          prevGuests.filter((guest) => Number(guest.id) !== Number(id))
        );
      }
    } catch (e) {
      console.error("Error:", e);
      setResponse(
        "Une erreur est survenue lors de la suppression. Veuillez réessayer"
      );
    }
  };

  const handleUpdate = async (updated: Guest) => {
    try {
      const token = await getToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/guests/${updated.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/merge-patch+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: updated.status,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.error("Détails erreur API :", data); // <-- Ajout ici
        throw new Error(data.message || "Erreur lors de la mise à jour");
      }

      setGuests((prev) =>
        prev.map((guest) => (guest.id === data.id ? data : guest))
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <main className="p-6 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-orange-500">Messages de contact</h1>
        <p className="text-gray-600">Liste des personnes ayant tenté de nous contacter</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {guests.map((guest) => (
          <article
            key={guest.id}
            className={`bg-white p-4 rounded-xl shadow-md transition-transform hover:scale-105
              ${guest.status === "pending" ? "border-red-500" : ""}
              ${guest.status === "onGoing" ? "border-orange-500" : ""}
              ${guest.status === "done" ? "border-green-500" : ""}
              border-2
            `}
          >
            <div className="flex justify-end gap-2 mb-2">
              <button onClick={() => setSelectedGuest(guest)} aria-label={`Modifier ${guest.lastName}`}>
                <AiFillEdit className="w-5 h-5 text-gray-600 hover:text-orange-500" />
              </button>
              <button onClick={() => handleDelete(guest.id)} aria-label={`Supprimer ${guest.lastName}`}>
                <FaRegTrashAlt className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
            <p className="text-sm"><strong>Nom :</strong> {guest.firstName} {guest.lastName}</p>
            <p className="text-sm"><strong>Email :</strong> {guest.email}</p>
            <p className="text-sm"><strong>Message :</strong> {guest.details}</p>
          </article>
        ))}
      </section>

      {selectedGuest && (
        <EditContactModal
          message={selectedGuest}
          onClose={() => setSelectedGuest(null)}
          onSave={handleUpdate}
        />
      )}
    </main>
  );
}