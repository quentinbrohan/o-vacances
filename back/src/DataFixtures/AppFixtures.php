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
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $users = [];
        $userName = ['Alexandre', 'Audrey', 'Cécilia', 'Loic', 'Quentin'];
        $pass = ['alexandre', 'audrey', 'cecilia', 'loic', 'quentin'];

         $mails = ['alexandre@gmail.com', 'audrey@gmail.com', 'cecilia@gmail.com', 'loic@gmail.com', 'quentin@gmail.com'];


        for ($i = 0; $i < 5; $i++) {
            $user = new User();
            $user->setEmail($mails[$i]);
            $user->setFirstname($userName[$i]);
            $user->setLastname($userName[$i]);
            $user->setPassword($this->passwordEncoder->encodePassword($user, $pass[$i]));
            $user->setRoles(['ROLE_USER']);
            $user->setAvatar('avatar.png');

            $users [] = $user;
            
            $manager->persist($user);
        }

        $trips = [];
        $tripTitle = ['Anniversaire', 'Eté 2020', 'EVG', 'Eté 2015'];
        $descriptions = ['Le voyage à dos de dromadaires prendra 4 heures la matinée et 2 heures le soir.
        Le matin, après le petit déjeuner, lorsque la caravane est prête, le départ vers le cœur du désert aura lieu. Après 3  heures de marche, avec quelques pauses de 15 ou 20 minutes pour prendre des photos, la caravane s\'arrête, les cuisiniers se chargent de préparer le déjeuner (couscous, soupe de blé, ...).'];
        $locations = ['Londres', 'Ile de Ré', 'Croatie', 'Espagne' ];
        $startTrip = ['10-08-2020', '25-07-2020', '01-09-2020', '01-08-2015'];
        $endTrip = ['30-08-2020', '09-08-2020', '03-09-2020', '10-08-2015'];
        
        for ($i = 0; $i < 4; $i++) {
            $trip = new Trip();
            $trip->setTitle($tripTitle[$i]);
            $trip->setDescription($descriptions[0]);
            $trip->setPassword($tripTitle[$i]);
            $trip->setLocation($locations[$i]);
            $trip->setCreator($users[mt_rand(0, 4)]);
            $trip->addUser($users[mt_rand(0, 4)]);
            $trip->addUser($users[mt_rand(0, 4)]);
            $trip->setStartDate(new \DateTime($startTrip[$i]));
            $trip->setEndDate(new \DateTime($endTrip[$i]));
            $trip->setImage('imageTrip.jpeg');
            $trip->setPassword($tripTitle[$i]);
            $trips[]=$trip;
    
            $manager->persist($trip);
        }

        $categories =[];
        $categoryTitle = ['restaurant', 'sortie nocturne', 'sport', 'visite culturelle', 'point d\'eau' ];
        for ($i = 0; $i < 5; $i++) {
            $category = new Category();
            $category->setName($categoryTitle[$i]);
            $category->setImage('category.jpeg');
            $categories[]=$category;

            $manager->persist($category);
        }

        $activities = ['canoé', 'chateau', 'nightclub', 'bistrot de France', 'foot', 'plage', 'rando de 7h' ];
        $startActivity = ['10-08-2020', '25-07-2020', '01-09-2020', '14-07-2015', '20-07-2015', '17-07-2015', '14-10-2015'];
        $endActivity = ['10-08-2020', '25-08-2020', '01-09-2020', '14-07-2015', '20-07-2015', '17-07-2015', '15-10-2015'];
        for ($i = 0; $i < 7; $i++) {
            $activity = new Activity();
            $activity->setTitle($activities[$i]);
            $activity->setDescription($descriptions[0]);
            $activity->setCreator($users[mt_rand(0, 4)]);
            $activity->setCategory($categories[mt_rand(0, 4)]);
            $activity->setTrip($trips[mt_rand(0, 3)]);
            $activity->setStartDate(new \DateTime($startActivity[$i]));
            $activity->setEndDate(new \DateTime($endActivity[$i]));


            $manager->persist($activity);
        }

        $disponibilities = [];
        $start = ['10-08-2020', '25-07-2020', '01-09-2020', '14-07-2015'];
        $end = ['15-08-2020', '02-08-2020', '03-09-2020', '24-07-2015'];
        for ($i = 0; $i < 4; $i++) {
            $disponibility = new Disponibility();
            $disponibility->setStartDate(new \DateTime($start[$i]));
            $disponibility->setEndDate(new \DateTime($end[$i]));
            $disponibility->setTrip($trips[mt_rand(0, 3)]);
            $disponibility->addUser($users[mt_rand(0, 4)]);
            $disponibilities[] = $disponibility;

            $manager->persist($disponibility);
        }

        
        $suggestions = ['jeux', 'raclette vendredi soir', 'on en parle à Gerard?', 'footing le matin pour ceux qui veulent'];
        $descriptionsSuggestions = ['"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Sed ut perspiciatis unde omnis iste natus error', 'Ut enim ad minima veniam, quis nostrum exercitationem', 'ally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exerc'];
        for ($i = 0; $i < 4; $i++) {
            $suggestion = new Suggestion();
            $suggestion->setTitle($suggestions[$i]);
            $suggestion->setDescription($descriptionsSuggestions[$i]);
            $suggestion->setUser($users[mt_rand(0, 4)]);
            $suggestion->setTrip($trips[mt_rand(0, 3)]);
            $suggestion->setCreatedAt(new \Datetime('now'));

            $manager->persist($suggestion);
        }


 

        $manager->flush();
    }
}