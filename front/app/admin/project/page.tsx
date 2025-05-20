// "use client";
 
// import { Project } from "@/types/project";
// import { getToken } from "@/utils/jwt";
// import { useEffect, useState } from "react";
 
// export default function AddArticle() {
//     const [response, setResponse] = useState("");
//     const [categories, setCategories] = useState<Project[]>([]);
 
//     const fetchCategories = async () => {
//         const token = await getToken();
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//             },
//         });
//         const data = await response.json();
//         setCategories(data.member as Project[]);
//     };
 
//     useEffect(() => {  
//         fetchCategories();
//     }, []);
    

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
 
//         const token = await getToken();
 
//         const formData = new FormData(e.target as HTMLFormElement);
//         const title = formData.get("title");
//         const content = formData.get("content");
//         const category = formData.get("category");
        
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/ld+json",
//                 "Authorization": `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//                 title: title,
//                 content: content,
//                 category: category
//             }),
//         });
 
//         const data = await response.json();
//         if (response.ok) {
//             setResponse("Catégorie ajoutée avec succès");
//         } else {
//             console.error(data);
//             if(data.description){
//                 setResponse(data.description);
//             } else {
//                 setResponse("Echec lors de la création de la catégorie");
//             }
//         }
//     }

//     return (
//         <>
//             <h1>Ajout d&apos;un article</h1>
//             {response && <p>{response}</p>}
//             {categories.length > 0 && (
//                  <form method="POST" onSubmit={handleSubmit}>
//                     <label htmlFor="title">Titre</label>
//                     <input type="text" id="title" name="title" />
//                     <br />
//                     <label htmlFor="content">Contenu</label>
//                     <textarea id="content" name="content"></textarea>
//                     <br />
//                     <label htmlFor="category">Catégorie</label>
//                     <select id="category" name="category">
//                         {categories.map((category: any) => (
//                             <option value={category['@id']} key={category.id}>{category.name}</option>
//                         ))}
//                     </select>
//                     <br />
//                     <button type="submit">Ajouter</button>
//                 </form>
//             )}
//         </>
//     )
// }