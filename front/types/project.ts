import { User } from "./user";
import { Student } from "./student";
 
export type Project = {
    id: number;
    title: string;
    details: string;
    student: Student;
    year: number;
    author: User;
    image: string;
    stack: string;
    link: string;
};
