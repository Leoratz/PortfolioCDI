<?php

namespace App\Services;

use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\State\ProcessorInterface;
use Symfony\Bundle\SecurityBundle\Security;

class UserRoleChangeService implements ProcessorInterface
{
    private Security $security;
    private EntityManagerInterface $entityManager;

    public function __construct(Security $security, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->entityManager = $entityManager;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $currentUser = $this->security->getUser();
        
        $uow = $this->entityManager->getUnitOfWork();
        $originalUser = $uow->getOriginalEntityData( $data );
        
        if(!$originalUser){
            throw new \Exception('User not found');
        }

        $originalRoles = $originalUser['roles'];

        if(!in_array('ROLE_USER', $originalRoles)){
            array_push($originalRoles, 'ROLE_USER');
        }
        
        $newRoles = $currentUser->getRoles();

        if ((array_diff($originalRoles, $newRoles) || array_diff($newRoles, $originalRoles)) && !in_array('ROLE_ADMIN', $originalUser['roles'])) {
            throw new \Exception('Only administrators can change roles.');
        }

        if (count($newRoles) === 1 && in_array('ROLE_USER', $newRoles)) {
            $data->setRoles($originalRoles);
        }

        return $data;
    }
}