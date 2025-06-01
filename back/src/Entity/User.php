<?php

namespace App\Entity;

use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use App\State\UpdateUserProcessor;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use App\State\UserPasswordHasherProcessor;
use Symfony\Component\Serializer\Attribute\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]

#[UniqueEntity('email', message: 'Cette adresse email est déjà utilisée.')]
#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')", securityMessage: 'You are not allowed to get users'),
        new Post(security: "is_granted('ROLE_ADMIN')", securityMessage: 'You are not allowed to add users', processor: UserPasswordHasherProcessor::class),
        new Get(security: "is_granted('ROLE_ADMIN') or object == user", securityMessage: 'You are not allowed to get this user'),
        new Patch(security: "is_granted('ROLE_ADMIN') or object == user", securityMessage: 'You are not allowed to update this user', processor: UpdateUserProcessor::class),
        new Delete(security: "is_granted('ROLE_ADMIN')", securityMessage: 'You are not allowed to delete this user'),
    ],

    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    forceEager: false
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[Groups('read')]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(length: 180)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    /**
     * @var list<string> The user roles
     */
    #[Groups(['read', 'write'])]
    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[Groups('write')]
    private ?string $plainPassword = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z]+$/',
        message: 'Le nom ne doit contenir que des lettres.'
    )]
    private ?string $lastName = null;

    #[Groups(['read', 'write'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 255)]
    #[Assert\Regex(
        pattern: '/^[a-zA-Z]+$/',
        message: 'Le prénom ne doit contenir que des lettres.'
    )]
    private ?string $firstName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @param list<string> $roles
     */
    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

     public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }
 
    public function setPlainPassword(string $plainPassword): static
    {
        $this->plainPassword = $plainPassword;
 
        return $this;
    }
}
