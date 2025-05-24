import { Media } from "./media";
import { Student } from "./student";
 
export type Project = {
    id: number;
    title: string;
    details: string;
    year: number;
    stack: string[];
    link: string;
    student: Student;
    medias? : Media[];
};
