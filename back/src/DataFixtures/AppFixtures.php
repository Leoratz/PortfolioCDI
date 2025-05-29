<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $super_admin = new User();
        $super_admin->setEmail('admin@email.fr');

        $password = $this->hasher->hashPassword($super_admin, 'admin');
        $super_admin->setPassword($password);

        $super_admin->setFirstName('Admin');
        $super_admin->setLastName('Admin');
        $super_admin->setRoles(['ROLE_ADMIN']);

        $manager->persist($super_admin);
        $manager->flush();
    }
}
