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
        $firstName = ['Fabio', 'Gaëtan', 'Christophe', 'Olivier', 'Sébastien', 'Luc', 'Djyp', 'Guillaume', 'Cécile', 'Loris', 'Jules', 'John'];
        $lastName = ['Bigeon', 'FOF', 'Coriolis', 'Bloup', 'Croquant', 'BalMasqué', 'Milo', 'Rainbow', 'Vue', 'WP', 'Vernes', 'Smith'];
        $pass = ['fabio', 'gaetan', 'christophe', 'olivier', 'sebastien', 'luc', 'djyp', 'guillaume', 'cecile', 'loris', 'jules', 'john'];
        $mails = ['fabio@gmail.com', 'gaetan@gmail.com', 'christophe@gmail.com', 'olivier@gmail.com', 'sebastien@gmail.com', 'luc@gmail.com', 'djyp@gmail.com', 'guillaume@gmail.com', 'cecile@gmail.com', 'loris@gmail.com', 'jules@gmail.com', 'john@gmail.com'];
        $avatar = ['/uploads/Fabio.jpg', '/uploads/Gaetan.png','/uploads/Christophe.png','/uploads/Olivier.png','/uploads/Sebastien.jpg','/uploads/Luc.png','/uploads/Djyp.png','/uploads/Guillaume.png','/uploads/Cecile.png','/uploads/Loris.png','/uploads/Jules.jpg','/uploads/John.jpg',];


        for ($i = 0; $i < 12; $i++) {
            $user = new User();
            $user->setEmail($mails[$i]);
            $user->setFirstname($firstName[$i]);
            $user->setLastname($lastName[$i]);
            $user->setPassword($this->passwordEncoder->encodePassword($user, $pass[$i]));
            $user->setRoles(['ROLE_USER']);
            $user->setAvatar($avatar[$i]);

            $users [] = $user;
            
            $manager->persist($user);
        }

        $trips = [];
        $tripTitle = ['voyage au centre de la terre', 'Voyage dans le temps', 'Vis ma vinaigrette', 'Antilles', 'Kamelott', 'Qui êtes-vous?' ];
        $descriptions = ['Je vous propose un voyage au centre de la terre. Je suis sûre qu’on peut y trouver un endroit sympa, calme, avec un petit point d’eau. Nous y trouverons peut être quelques animaux…\n Le seul inconvénient, c’est le temps de route...', 'Petit voyage sympa dans une boite (TARDIS) qui est plus grande à l’intérieur qu’à l’exterieur. ce voyage risque de durer plus longtemps que prevu', 'Des fois je vis des hauts, des fois je vis des bas, mais la plupart du temps, je vie ma vinaigrette.\n Des fois je Vivaldi, des fois je vichyssoise, mais la plupart du temps, je vis ma vinaigrette', 'je n\’y peux rien… j\’adore les Antilles, oh bal masqué ohé ohé', 'La promo Isengard.. euh non… Dragons… non.. EXCALIBUR va nous manquer à tous. Je vous propose donc ce pèlerinage sur les terres de Kaamelott et de faire la fête !', 'Qui êtes-vous?’, ‘Qui suis-je? Où vais-je? Dans quel état j’erre?'];
        $passwordTrip = ['centre', 'tardis', 'vinaigrette', 'oups', 'TheBestPromo', 'Qui' ];
        $locations = ['Islande', 'Temps', 'France', 'Antilles', 'France', 'Je sais pas' ];
        $creator = [$users[10], $users[11], $users[1], $users[5], $users[3], $users[1]];
        $startTrip = ['24-05-1863', '01-12-2000', '11-08-2020', '06-11-2020', '30-07-2020', '20-07-2020'];
        $endTrip = ['27-08-1863', '01-01-2001', '12-08-2020', '30-06-2020', '10-08-2020', '28-07-2020'];
        $imageTrip = ['/uploads/centreTerre.jpg', '/uploads/Tardis.jpg', '/uploads/Vinaigrette.jpg', '/uploads/antilles.jpg', '/uploads/Kaamelott.png', '/uploads/what.jpg'];
        
        for ($i = 0; $i < 6; $i++) {
            $trip = new Trip();
            $trip->setTitle($tripTitle[$i]);
            $trip->setDescription($descriptions[$i]);
            $trip->setPassword($passwordTrip[$i]);
            $trip->setLocation($locations[$i]);
            $trip->setCreator($creator[$i]);
            $trip->addUsers($users[mt_rand(0, 4)]);
            $trip->addUsers($users[mt_rand(0, 4)]);
            $trip->setStartDate(new \DateTime($startTrip[$i]));
            $trip->setEndDate(new \DateTime($endTrip[$i]));
            $trip->setImage($imageTrip[$i]);
            $trips[]=$trip;
    
            $manager->persist($trip);
        }

        $categories =[];
        $categoryTitle = ['Restaurant/bar', 'Sortie culturelle (ciné, musée, exposition...)', 'Visite guidée', 'Espace vert / parc', 'Plage / piscine / lac', 'Concert / spectacle', 'Shopping', 'Attraction touristique (village..)', 'Randonnée', 'sport (canoé, foot, ..)', 'Sortie nocturne', 'Parc d\'attraction', 'Autres'];
        $categoryImage = ['/images/restaurant.jpg', '/images/culture.jpg', '/images/visite.jpg', '/images/vert.jpg', '/images/eau.jpg', '/images/concert.jpg', '/images/shopping.jpg', '/images/tourisme.jpg', '/images/randonnée.jpg', '/images/sport.jpg', '/images/nocturne.jpg', '/images/parc.jpg', '/images/autres.jpg'];
        for ($i = 0; $i < 13; $i++) {
            $category = new Category();
            $category->setName($categoryTitle[$i]);
            $category->setImage($categoryImage[$i]);
            $categories[]=$category;

            $manager->persist($category);
        }

        $activities = ['Epée', 'Fête', 'Randonnée', 'Coiffeur', 'Bon resto', 'Soirée Créole' ];
        $activityDescription = ['On pourrait essayer de retirer l’épée du rocher?', 'grosse fete de prévue, je m\’occupe de la musique', 'j\’ai repéré une belle randonnée à faire c’est celle là : https://www.kaamelott.com/', 'Franchement on en a tous besoin, j’en peux plus de mettre des casquettes avec cette chaleur !\n Ca va etre FEUN!', 'J’ai trouvé ce petit resto : hummm gourmand et croquant : https://www.lebardespres.com/fr/', 'c’est prévu le jeudi soir au macumba club'];
        $activityCreator = [$users[1], $users[2], $users[9], $users[4], $users[5], $users[6]];
        $activityCategories = [$categories[2], $categories[5], $categories[8], $categories[12], $categories[0], $categories[5]];
        $startActivity = [NULL, NULL, '01-08-2020', NULL, NULL, '06-08-2020'];
        $endActivity = [NULL, NULL, '01-08-2020', NULL, NULL, '06-08-2020'];
        for ($i = 0; $i < 6; $i++) {
            $activity = new Activity();
            $activity->setTitle($activities[$i]);
            $activity->setDescription($activityDescription[$i]);
            $activity->setCreator($activityCreator[$i]);
            $activity->setCategory($activityCategories[$i]);
            $activity->setTrip($trips[4]);
            $activity->setStartDate(new \DateTime($startActivity[$i]));
            $activity->setEndDate(new \DateTime($endActivity[$i]));

            $manager->persist($activity);
        }
        
        $suggestions = ['Ambiance', 'Ambiance', 'Ambiance', 'Ambiance', 'Courses', 'Ambiance', 'question', '..'];
        $descriptionsSuggestions = ['Et je prends de quoi faire un dessin! j’adore faire des petits dessins...', 'j’aime bien le dessin mais je préfère le 1-2-3 soleil !', 'Ca dépend...', 'WTF!', 'courses','j’amène des mouchoirs ! j\’ai une bonne réserve', 'un petit sondage : Vous etes d\’accord avec moi? \n oui \n oui', 'je peux amener Milo?', 'Ketchup'];
        $suggestionCreator = [$users[1], $users[2], $users[3], $users[6], $users[2] ,$users[1], $users[6], $users[7]];
        for ($i = 0; $i < 8; $i++) {
            $suggestion = new Suggestion();
            $suggestion->setTitle($suggestions[$i]);
            $suggestion->setDescription($descriptionsSuggestions[$i]);
            $suggestion->setUser($suggestionCreator[$i]);
            $suggestion->setTrip($trips[4]);
            $suggestion->setCreatedAt(new \Datetime('now'));

            $manager->persist($suggestion);
        }


 

        $manager->flush();
    }
}