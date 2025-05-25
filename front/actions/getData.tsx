import { getToken } from "@/utils/jwt";

export const getData = async () => {  
    
    const token = await getToken();

    const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });

    const users = await usersRes.json();
    
    const guestsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/guests`, {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    const guests = await guestsRes.json();

    const projectsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    const projects = await projectsRes.json();

    const studentsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/students`, {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    const students = await studentsRes.json();

    const mediasRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media`, {
        method: "GET",
        headers: {
            "Content-Type": "application/ld+json",
            Authorization: `Bearer ${token}`,
        },
    });
    const medias = await mediasRes.json();

    return {
        users: users,
        guests: guests,
        projects: projects,
        students: students,
        medias: medias,
    };
}