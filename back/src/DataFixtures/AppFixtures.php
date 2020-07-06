<?php

namespace App\DataFixtures;

use App\Entity\Activity;
use App\Entity\Category;
use App\Entity\Disponibility;
use App\Entity\Suggestion;
use App\Entity\Trip;
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

        $trips = ['Anniversaire', 'Eté 2020', 'EVG', 'Eté 2015'];
        $descriptions = ['Le voyage à dos de dromadaires prendra 4 heures la matinée et 2 heures le soir.
        Le matin, après le petit déjeuner, lorsque la caravane est prête, le départ vers le cœur du désert aura lieu. Après 3  heures de marche, avec quelques pauses de 15 ou 20 minutes pour prendre des photos, la caravane s\'arrête, les cuisiniers se chargent de préparer le déjeuner (couscous, soupe de blé, ...).'];
        $locations = ['Londres', 'Ile de Ré', 'Croatie', 'Espagne' ]
        
        for ($i = 0; $i < 4; $i++) {
            $trip = new Trip();
            $trip->setTitle($trips[$i]);
            $trip->setDescription($descriptions[0]);
            $trip->setLocation($locations[$i]);

            $manager->persist($trip);
        }

        $activities = ['canoé', 'chateau', 'boite', 'bistrot de France', 'foot', 'plage', 'rando de 7h' ]
        for ($i = 0; $i < 7; $i++) {
            $activity = new Activity();
            $activity->setTitle($trips[$i]);
            $activity->setDescription($descriptions[$i]);
            $activity->setCreator(rand(0, 5));
            $activity->setCategory(rand(0, 5));
            $activity->setTrip(rand(0, 4));

            $manager->persist($activity);
        }

        $categories = ['restaurant', 'sortie nocturne', 'sport', 'visite culturelle', 'point d\'eau' ]
        for ($i = 0; $i < 5; $i++) {
            $category = new Category();
            $category->setName($categories[$i]);
            $category->setPicture('category.jpeg');

            $manager->persist($activity);
        }

        $start = ['10-08-2020', '25-07-2020', '01-09-2020', '14-07-2015'];
        $end = ['15-08-2020', '02-08-2020', '03-09-2020', '24-07-2015'];
        for ($i = 0; $i < 4; $i++) {
            $disponibility = new Disponibility();
            $disponibility->setStartDate(new \DateTime($start[$i]));
            $disponibility->setEndDate((new \DateTime($end[$i]));
            $disponibility->setTrip(rand(0, 4));

            $manager->persist($disponibility);
        }

        
        $suggestions = ['jeux', 'raclette vendredi soir', 'on en parle à Gerard?', 'footing le matin pour ceux qui veulent']
        for ($i = 0; $i < 4; $i++) {
            $suggestion = new Suggestion();
            $suggestion->setTitle($suggestions[$i]);
            $activity->setDescription($descriptions[0]);
            $suggestion->setUser(rand(0, 5));
            $suggestion->setTrip(rand(0, 4));

            $manager->persist($disponibility);
        }




        $manager->flush();
    }
}