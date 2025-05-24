"use client";
 
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import React from "react";
import HomePage from "../components/HomePage"; 

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
 
  // Récupération des projets
  const getProjects = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
      const data = await res.json();
      setProjects(data as Project[]);
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    getProjects();
  }, []);
 
  return (
    <>
      <HomePage projects={projects} />
    </>
  );
}