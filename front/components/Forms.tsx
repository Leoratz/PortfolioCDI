import { useState } from "react";

export default function Forms() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(e.target as HTMLFormElement);
      const lastName = formData.get("last_name") as string;
      const firstName = formData.get("first_name") as string;
      const email = formData.get("email") as string;
      const details = formData.get("details") as string;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/guests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lastName,
            firstName,
            email,
            details,
          }),
        }
      );

      await response.json();

      if (response.ok) {
        setResponse("Projet ajouté avec succès");
        form.reset();
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white flex flex-col gap-6 p-4">
      <div className="flex flex-col justify-center items-center gap-2 py-10">
        <p className="font-semibold text-sm text-center uppercase">
          Contactez-nous
        </p>
        <p className="font-bold text-2xl text-center">
          Prêt à rejoindre l&apos;aventure ?
        </p>
        <p className="font-normal text-md text-center text-gray-600 w-full md:w-1/2">
          Laissez un message à notre admission pour en savoir plus sur notre
          programme et le processus d&apos;admission
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center px-4 md:px-26 gap-8">
        {/* Contacts de l'école */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="font-bold pb-2 text-lg">Contactez-nous !</h2>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <span className="text-sm">admission@imm.fr</span>
          </div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <span className="text-sm">+33 1 23 45 67 89</span>
          </div>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="text-sm">47 bd Pesaro, Nanterre</span>
          </div>
        </div>

        {/* Formulaire de contact */}
        <div className="w-full flex flex-col justify-center">
          <h2 className="font-bold pb-2 text-lg">Envoyez-nous un message</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-4 flex-wrap">
              <div className="flex flex-col gap-2 grow">
                <label htmlFor="first_name">Prénom :</label>
                <input
                  className="shadow p-2 rounded"
                  placeholder="Votre nom"
                  type="text"
                  id="first_name"
                  name="first_name"
                  required
                  readOnly={loading}
                />
              </div>
              <div className="flex flex-col gap-2 grow">
                <label htmlFor="last_name">Nom :</label>
                <input
                  className="shadow p-2 rounded"
                  placeholder="Votre nom"
                  type="text"
                  id="last_name"
                  name="last_name"
                  required
                  readOnly={loading}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email :</label>
              <input
                className="shadow p-2 rounded"
                placeholder="Votre email"
                type="email"
                id="email"
                name="email"
                required
                readOnly={loading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="details">Message :</label>
              <textarea
                className="shadow p-2 rounded"
                placeholder="Votre message"
                id="details"
                name="details"
                required
                readOnly={loading}
              />
            </div>

            <div className="mt-4">
              {response ? <p>{response}</p> : ""}
              <button
                className="bg-orange-500 text-white p-2 rounded w-fit mt-1"
                type="submit"
                disabled={loading}
              >
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
