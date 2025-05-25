<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Project;
use App\Entity\Student;
use App\Entity\Media;


class ProjectController extends AbstractController
{
    #[Route('/project', name: 'app_project')]
    public function create(Request $request, EntityManagerInterface $em)
    {
         $data = json_decode($request->getContent(), true);

        $title = $data['title'] ?? null;
        $details = $data['details'] ?? null;
        $students = $data['students'] ?? [];
        $year = $data['year'] ?? null;
        $stack = $data['stack'] ?? [];
        $link = $data['link'] ?? null;
        $visibility = $data['visibility'] ?? true;

        if(!$title || !$details || empty($students) || !$year || !$stack) {
            return $this->json(['error' => 'Missing required fields : '. json_encode($data)], Response::HTTP_BAD_REQUEST);
        }

        $em->getConnection()->beginTransaction();
        try {
            $project = new Project();
            $project->setTitle($title);
            $project->setDetails($details);
            $project->setYear($year);
            $project->setStack($stack);
            $project->setLink($link);
            $project->setVisibility($visibility);

            foreach ($students as $studentId) {
                $student = $em->getRepository(Student::class)->find($studentId);
                if ($student) {
                    $project->addStudent($student);
                }
            }

            if(array_key_exists('medias', $data) && is_array($data['medias']) && !empty($data['medias'])) {
                foreach ($data['medias'] as $image) {
                    $media = $em->getRepository(Media::class)->findOneBy(['id' => $image]);
                    if(!empty($media)) {
                        $project->addMedium($media);
                    }
                }
            }

            $em->persist($project);
            $em->flush();
            $em->getConnection()->commit();

            return $this->json(['message' => 'Project created successfully'], Response::HTTP_CREATED);

        } catch (\Exception $e) {
            $em->getConnection()->rollBack();
            return $this->json(['error' => 'Failed to create project'], Response::HTTP_INTERNAL_SERVER_ERROR);
            // return $this->json(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
