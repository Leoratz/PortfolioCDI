<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Attribute\Groups;

use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(security: "is_granted('ROLE_USER')"),
        new Patch(security: "is_granted('ROLE_USER')"),
        new Delete(security: "is_granted('ROLE_USER')"),
    ],

    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false
)]
class Project
{
    #[Groups('read')]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 4, max: 255)]
    private ?string $title = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    #[Assert\Length(min: 10, max : 5000)]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z0-9\s.,;:!?()\-]+$/',
        message: 'The details can only contain letters, numbers, and basic punctuation.'
    )]
    #[Assert\Regex(
        pattern: '/^[^<>]*$/',
        message: 'The details cannot contain HTML tags.'
    )]
    private ?string $details = null;

    /**
     * @var Collection<int, Student>
     */
    #[Groups(['read', 'write'])]
    #[ORM\ManyToMany(targetEntity: Student::class, inversedBy: 'projects')]
    private Collection $students;

    #[Groups(['read', 'write'])]
    #[ORM\Column]
    #[Assert\NotBlank]
    #[Assert\Range(
        min: 1,
        max: 5,
        notInRangeMessage: 'L\'année doit être comprise entre {{ min }} et {{ max }}.',
    )]
    private ?int $year = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(type: Types::ARRAY)]
    #[Assert\NotBlank]
    #[Assert\Count(
        min: 1,
        minMessage: 'The stack must contain at least one item.',
    )]
    private array $stack = [];

    #[Groups(['read', 'write'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $link = null;

    /**
     * @var Collection<int, Media>
     */
    #[Groups(['read', 'write'])]
    #[ORM\OneToMany(targetEntity: Media::class, mappedBy: 'project')]
    private Collection $medias;

    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->medias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getDetails(): ?string
    {
        return $this->details;
    }

    public function setDetails(string $details): static
    {
        $this->details = $details;

        return $this;
    }

    /**
     * @return Collection<int, Student>
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): static
    {
        if (!$this->students->contains($student)) {
            $this->students->add($student);
        }

        return $this;
    }

    public function removeStudent(Student $student): static
    {
        $this->students->removeElement($student);

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): static
    {
        $this->year = $year;

        return $this;
    }

    public function getStack(): array
    {
        return $this->stack;
    }

    public function setStack(array $stack): static
    {
        $this->stack = $stack;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(?string $link): static
    {
        $this->link = $link;

        return $this;
    }

    /**
     * @return Collection<int, Media>
     */
    public function getMedias(): Collection
    {
        return $this->medias;
    }

    public function addMedium(Media $medium): static
    {
        if (!$this->medias->contains($medium)) {
            $this->medias->add($medium);
            $medium->setProject($this);
        }

        return $this;
    }

    public function removeMedium(Media $medium): static
    {
        if ($this->medias->removeElement($medium)) {
            // set the owning side to null (unless already changed)
            if ($medium->getProject() === $this) {
                $medium->setProject(null);
            }
        }

        return $this;
    }
}
