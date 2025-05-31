"use client";
import React from "react";

export default function AddStudent() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <section
        className="bg-white p-8 rounded shadow-md w-full h-full max-w-2xl flex flex-col justify-center"
        aria-labelledby="add-student-title"
      >
        <h1
          id="add-student-title"
          className="text-black font-extrabold flex justify-center mb-8 text-2xl"
          tabIndex={0}
        >
          Ajouter un étudiant
        </h1>
        <form
          method="POST"
          action="/api/students"
          className="flex flex-col gap-4 w-full"
          aria-label="Formulaire d'ajout d'étudiant"
          aria-describedby="add-student-desc"
          autoComplete="off"
        >
          <p id="add-student-desc" className="sr-only">
            Remplissez ce formulaire pour ajouter un nouvel étudiant.
          </p>
          <div>
            <label htmlFor="nom" className="text-black font-semibold block">
              Nom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
              required
              aria-required="true"
              aria-label="Nom de l'étudiant"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="text-black font-semibold block">
              Prénom <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
              required
              aria-required="true"
              aria-label="Prénom de l'étudiant"
            />
          </div>
          <div>
            <label htmlFor="github" className="text-black font-semibold block">
              GitHub
            </label>
            <input
              type="text"
              id="github"
              name="github"
              className="border border-gray-300 rounded px-3 py-2 text-black w-full"
              aria-label="Profil GitHub de l'étudiant"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 rounded px-4 py-2 hover:bg-orange-600 transition-colors text-white font-semibold w-full"
            aria-label="Ajouter l'étudiant"
          >
            Ajouter
          </button>
        </form>
      </section>
    </main>
  );
}