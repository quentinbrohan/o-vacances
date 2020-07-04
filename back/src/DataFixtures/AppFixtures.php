<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $users = ['Alexandre', 'Audrey', 'Cécilia', 'Loic', 'Quentin'];
        
        for ($i = 0; $i < 5; $i++) {
            $user = new User();
            $user->setEmail($user.'gmail.com');
            $user->setFirstname($users[$i]);
            $user->setLastname($users[$i]);
            $user->setPassword($users[$i]);

            
            $manager->persist($user);
        }




        $manager->flush();
    }
}