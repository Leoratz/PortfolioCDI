"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/utils/jwt";
import { getData } from "@/actions/getData";
import { User } from "@/types/user";
import { Student } from "@/types/student";
import { useRouter } from "next/navigation";

import { Select, Switch, Input, Tag } from "antd";

export default function AddProject() {
  const router = useRouter();

  const [data, setData] = useState<{
    users: User;
    students: Student[];
  } | null>(null);
  const [stack, setStack] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [visbility, setVisibility] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [response, setResponse] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | undefined>();

  const datas = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    datas();
  }, []);

  const handleAddStack = () => {
    if (inputValue.trim() && !stack.includes(inputValue.trim())) {
      setStack([...stack, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveStack = (removedTag: string) => {
    setStack(stack.filter((tag) => tag !== removedTag));
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const token = getToken();
      for (let i = 0; i < files.length; i++) {
        formData.append("file", files[i]);

        const upload = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/media`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const result = await upload.json();
        if (upload.status === 201) {
          setMedia((prevMedia) => {
            if (prevMedia) {
              return [...prevMedia, result.media.id];
            } else {
              return [result.media.id];
            }
          });
        } else {
          console.error("Erreur lors de l'upload");
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();
      const formData = new FormData(e.target as HTMLFormElement);
      const title = formData.get("title") as string;
      const details = formData.get("details") as string;
      const link = formData.get("link") as string;
      const images = media;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            details,
            students: selectedStudents,
            year: Number(selectedYear),
            stack,
            link,
            medias: images,
            visibility: visbility,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponse("Projet ajouté avec succès");
        router.push(`/admin/project/${data.id}`);
      } else {
        console.error(data);
        setResponse(data.description || "Echec lors de la création du projet");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-black font-extrabold flex justify-center m-8 text-3xl">
        Ajout d&apos;un projet
      </h1>
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 pb-8"
      >
        <div className="flex gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-black"
            >
              Titre <span className="text-orange-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border border-gray-300 rounded px-3 py-1 text-black bg-white focus:outline-orange-500"
              readOnly={loading}
            />
          </div>

          <div className="flex flex-col justify-between">
            <label
              htmlFor="visibility"
              className="text-black"
            >
              Projet visible par le public <span className="text-orange-500">*</span>
            </label>
            <Switch
              id="visibility"
              style={
                visbility ? { backgroundColor: "var(--color-orange-500)" } : {}
              }
              className="w-fit"
              defaultValue={visbility}
              onChange={(value) => setVisibility(value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="details"
            className="text-black"
          >
            Description <span className="text-orange-500">*</span>
          </label>
          <textarea
            id="details"
            name="details"
            className="border border-gray-300 rounded px-3 py-1 text-black focus:outline-orange-500 bg-white"
            readOnly={loading}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="students"
            className="text-black"
          >
            Etudiants <span className="text-orange-500">*</span>
          </label>
          <Select
            id="students"
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            className="custom-select"
            placeholder="Sélectionner les étudiants"
            options={data?.students?.map((student) => ({
              label: `${student.firstName} ${student.lastName}`,
              value: student.id,
            }))}
            filterOption={(input, option) =>
              (option?.label as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            onChange={(value) => setSelectedStudents(value)}
            disabled={loading}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="year"
            className="text-black"
          >
            Année d&apos;étude <span className="text-orange-500">*</span>
          </label>
          <select
            id="year"
            name="year"
            className="border border-gray-300 rounded px-3 py-2 text-black bg-white focus:outline-orange-500"
            disabled={loading}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option
              value={1}
              className="text-black"
            >
              1ère année
            </option>
            <option
              value={2}
              className="text-black"
            >
              2ème année
            </option>
            <option
              value={3}
              className="text-black"
            >
              3ème année
            </option>
            <option
              value={4}
              className="text-black"
            >
              4ème année
            </option>
            <option
              value={5}
              className="text-black"
            >
              5ème année
            </option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="stack"
            className="text-black"
          >
            Technologies <span className="text-orange-500">*</span>
          </label>
          <div className="border border-gray-300 rounded px-3 py-2 text-black flex flex-col gap-2">
            {stack.length > 0 && (
              <div>
                {stack.map((tag) => (
                  <Tag
                    key={tag}
                    closable
                    onClose={() => handleRemoveStack(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
            <Input
              id="stack"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={(e) => {
                e.preventDefault();
                handleAddStack();
              }}
              placeholder="Ajouter une technologie"
              className="border-none focus:outline-none"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="link"
            className="text-black"
          >
            Lien du projet
          </label>
          <input
            type="text"
            id="link"
            name="link"
            className="border border-gray-300 rounded px-3 py-1 text-black bg-white focus:outline-orange-500"
            readOnly={loading}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="images"
            className="text-black"
          >
            Images du projet <span className="text-orange-500">*</span>
          </label>
          <input
            type="file"
            onChange={handleFile}
            multiple
            id="images"
            name="images"
            className="border border-gray-300 rounded px-3 py-1 text-black bg-white focus:outline-orange-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white rounded px-4 py-1 hover:bg-orange-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Traitement en cours..." : "Ajouter"}
        </button>

        {response && (
          <div
            className={`text-center ${
              response.includes("succès") ? "text-green-500" : "text-red-500"
            }`}
          >
            {response}
          </div>
        )}
      </form>
    </div>
  );
}
