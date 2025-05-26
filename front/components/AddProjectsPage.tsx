import { RxCross2 } from "react-icons/rx";
import { useEffect, useRef } from "react";
import { Project } from "@/types/project"; 


type ProjectFormPopupProps = {
  onClose: () => void;      
  project? : Project | null;
}

export default function AddProjectsPage({ onClose, project }: ProjectFormPopupProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };
  const isEdit = Boolean(project)

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={handleClickOutside} className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur bg-opacity-50 z-50" >
      <div ref={modalRef} className="absolute w-1/2 bg-white p-10 rounded-lg flex flex-col gap-8">
        <button className="w-full flex justify-end text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose} aria-label="Fermer la fenêtre">
          <RxCross2 className="h-6 w-6" />
        </button>
        <div>
            <h2 id="modal-title" className="text-center text-xl font-bold">
                {isEdit ? "Modifier le projet" : "Ajouter un nouveau projet"}
            </h2>   
        </div>
        <form className="flex flex-col gap-1 w-full items-center" method="POST" >
            <div className="mb-4 w-full">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2" >
                Titre du projet
                </label>
                <input
                defaultValue={project?.title || ''}
                placeholder="Titre du projet"
                type="text"
                id="title"
                name="title"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4 w-full">
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
                Année d&apos;étude
                </label>
                <input
                defaultValue={project?.year || ''}
                placeholder="Année d'étude"
                type="number"
                id="year"
                name="year"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4 w-full">
                <label
                htmlFor="technology"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Technologie utilisées
                </label>
                <input
                defaultValue={project?.technology || ''}
                placeholder="Technologie utilisée"
                type="text"
                id="technology"
                name="technology"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4 w-full">
                <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Détails du projet
                </label>
                <textarea
                defaultValue={project?.details || ''}
                id="description"
                name="description"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="mb-4 w-full">
                <label
                htmlFor="imageUrl"
                className="block text-gray-700 text-sm font-bold mb-2"
                >
                Télécharger une image avec le projet
                </label>
                <input
                placeholder="URL de l'image"
                type="file"
                id="imageUrl"
                name="imageUrl"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...(!isEdit && { required: true })}
                />
            </div>

            <button
            type="submit"
            className="mt-6 items-center w-fit bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
               {isEdit ? "Enregistrer les modifications" : "Ajouter le projet"}
            </button>
        </form>
      </div>
    </div>
  );
}
