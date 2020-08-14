<?php

namespace App\Controller\Api;

use App\Entity\Trip;
use App\Entity\User;
use App\Form\TripType;
use App\Repository\TripRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TripController extends AbstractController
{
    /**
     * @Route("/api/v0/users/{id}/trips", name="api_v0_users_trips_list", methods="GET")
     */
    public function list(UserRepository $userRepository, SerializerInterface $serializer, $id)
    {
        // On demande à Doctrine tous les voyages
        $trips = $userRepository->findAllTripsByUser($id);

        $json = $serializer->serialize($trips, 'json', ['groups' => 'apiV0_tripByUser']);
        
        $response = new JsonResponse($json, 200, [], true);

        return $response;
    } 

    /**
     * @Route("/api/v0/users/{id}/trips", name="api_v0_trips_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, UserRepository $userRepository, $id)
    {
        $user = $userRepository->find($id);
        $trip = new Trip;
        // On extrait de la requête le json reçu

        $jsonText = $request->get('document');

        $image = $request->files->get('file');

        try {
            // on crée une nouvelle entité Trip avec le serializer
            $trip = $serializer->deserialize($jsonText, Trip::class, 'json');
            
            // validation des données de $trips en fonction des Asserts des entités
            $errors = $validator->validate($trip);

            // s'il y a des erreurs
            if(count($errors) > 0){
                return $this->json($errors, 400);
            }
            if (!empty($image)){
             // On génère un nouveau nom de fichier
             $fichier = '/uploads/'. md5(uniqid()).'.'.$image->guessExtension();
             
             // On copie le fichier dans le dossier uploads
             $image->move(
                 $this->getParameter('images_directory'),
                 $fichier
             );
             
            } else {
                $fichier = '/images/voyage.jpg';
            }
            $trip->setImage($fichier);
            $trip->addUsers($user);
            $trip->setCreator($user);
            

            $em->persist($trip);
            $em->flush();
            return $this->json($trip, 201, [], ['groups' => 'apiV0_trip']);

        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
        }
    }
    /**
     * @Route("/api/v0/users/{idUser}/trips/{id}", name="api_v0_trips_registration", methods={"POST"})
     */
    public function registration(Request $request, TripRepository $tripRepository, SerializerInterface $serializer, EntityManagerInterface $em, $id, $idUser, UserRepository $userRepository)
    {
        // On récupère le voyage
        $trip = $tripRepository->find($id);
        
        // je récupère l'id de la personne qui fait l'action sous format int (le $idUser est sous format string)
        $user = $userRepository->find($idUser);
        $userId = $user->getId();
        $participant = 0;
        
        $usersBy = $tripRepository->findAllUsersByTrip($id);
        $tripUsers = $trip->getUsers();
        // si l'un des participant est la personne qui consulte la page $participant = 1
        foreach($tripUsers as $userParticipant){
            $i = $userParticipant->getId();      
            if($i===$userId) {
                $participant =+1;
            } 
        }

        // si l'utilisateur fait parti des participants au voyage
        if($participant >= 1){
            $trip = $tripRepository->findWithAllData($id);
            // On demande à Doctrine le voyage
            
            $json = $serializer->serialize($trip, 'json', ['groups' => 'apiV0_trip']);
            
            $response = new JsonResponse($json, 200, [], true);

        return $response;
        
        } else {
            // sinon alors verifier qu'il envoie le bon mot de passe. 
            // alors je récupère le password envoyé lors de la requete et je le compare à celui de la BDD
            $jsonText = $request->getContent();
            $jsonArray = json_decode($jsonText, true);
            $passwordSend = $jsonArray["password"];
            $PasswordTrip = $trip->getPassword();

            if($passwordSend === $PasswordTrip){
                
                $trip->addUsers($user);
                $em->persist($trip);
                $em->flush();

                $json = $serializer->serialize($trip, 'json', ['groups' => 'apiV0_trip']);
                $response = new JsonResponse($json, 200, [], true);
                return $response;
                
            } else {
                return $this->json([
                    'status' => 401,
                    'message'=>"Vous n'avez pas l'autorisation d'acceder au voyage. Contactez le modérateur du voyage"
                ], 401);
            }
        }

    }


    /**
     * @Route("/api/v0/users/{idUser}/trips/{id}", name="api_v0_trips_show", methods={"GET"})
     */
    public function show(Request $request, TripRepository $tripRepository, SerializerInterface $serializer, EntityManagerInterface $em, $id, $idUser, UserRepository $userRepository)
    {
        // On récupère le voyage
        $trip = $tripRepository->findWithAllData($id);
        
        // je récupère l'id de la personne qui fait l'action sous format int (le $idUser est sous format string)
        $user = $userRepository->find($idUser);
        $userId = $user->getId();
        $participant = 0;
        
        $usersBy = $tripRepository->findAllUsersByTrip($id);
        $tripUsers = $trip->getUsers();
        // si l'un des participant est la personne qui consulte la page $participant = 1
        foreach($tripUsers as $userParticipant){
            $i = $userParticipant->getId();      
            if($i===$userId) {
                $participant =+1;
            } 
        }

        // si l'utilisateur fait parti des participant au voyage
        if($participant >= 1){
            $trip = $tripRepository->findWithAllData($id);
            // On demande à Doctrine le voyage
            
            $json = $serializer->serialize($trip, 'json', ['groups' => 'apiV0_trip']);
            
            $response = new JsonResponse($json, 200, [], true);

        return $response;
        
        } else {
                return $this->json([
                    'status' => 401,
                    'message'=>"Vous n'avez pas l'autorisation d'acceder au voyage. Contactez le modérateur du voyage"
                ], 401);
        }
        

    }

    /**
     * @Route("/api/v0/users/{idUser}/trips/{id}", name="api_v0_trips_edit", methods="PATCH")
     */
    public function edit(TripRepository $tripRepository, SerializerInterface $serializer, Request $request, $id, $idUser, EntityManagerInterface $em, ValidatorInterface $validator, UserRepository $userRepository)
    {
       // On demande à Doctrine le voyage
       $trip = $tripRepository->find($id);
        

        // je récupère l'id du créateur et celui de la personne qui fait l'action
        $user = $userRepository->find($idUser);
        $userId = $user->getId();
        $creatorId = $trip->getCreator()->getId();
      
 
        if (!empty($trip)) {
            // seul le créateur du voyage à le droit de modifier ces informations
            if ($userId === $creatorId) {

                // On extrait de la requête le json reçu
                //$jsonText = $request->get('document');
                $jsonText = $request->get('document');
                $image = $request->files->get('file');

/*                 $trip->setImage(
                    new File($this->getParameter('images_directory').'/'.$trip->getImage())
                );
 */               
                try {
                    // on crée une nouvelle entité Trip avec le serializer
                    $newTrip = $serializer->deserialize($jsonText, Trip::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $trip]);
                    
                    // validation des données de $trips en fonction des Asserts des entités
                    $errors = $validator->validate($newTrip);
                    
                    // s'il y a des erreurs
                    if (count($errors) > 0) {
                        return $this->json($errors, 400);
                    }
                
                    if (empty($image)){
                        $oldImage = $trip->getImage();
                        $trip->setImage($oldImage);
                    }else {
                        // On génère un nouveau nom de fichier
                        $fichier = '/uploads/'. md5(uniqid()).'.'.$image->guessExtension();
                        
                        // On copie le fichier dans le dossier uploads
                        $image->move(
                            $this->getParameter('images_directory'),
                            $fichier
                        );
                        $trip->setImage($fichier);
                    }

                    $em->flush();
                    return $this->json($newTrip, 201, [], ['groups' => 'apiV0_trip']);
                } catch (NotEncodableValueException $e) {
                    return $this->json([
                        'status' => 400,
                        'message'=>$e->getMessage()
                    ], 400);
                }
            } else {
                return $this->json([
                    'status' => 403,
                    'message'=>"Vous n'avez pas le droit d'effectuer cette action"
                ], 403);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Ce voyage n'existe pas"
            ], 400);
        }
    

    }

    /**
     * @Route("/api/v0/trips/{id}/users", name="api_v0_trips_users_new", methods="POST")
     */
    public function newUsersToTrip(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, Trip $trip, UserRepository $userRepository)
    {
        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();

        $jsonArray = json_decode($jsonText, true);

        if (!empty($trip)) {
            try {
                foreach ($jsonArray['email'] as $email) {
                    $user = $userRepository->findByEmail($email);
                    $trip->addUsers($user);
                }

                $em->persist($trip);
                $em->flush();
                return $this->json($trip, 201, [], ['groups' => 'apiV0_trip']);
            } catch (NotEncodableValueException $e) {
                return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Ce voyage n'existe pas"
            ], 400);

        }
    }

    /**
     * @Route("api/v0/users/{idUser}/trips/{id}", name="api_v0_trips_users_delete", methods={"DELETE"})
     */
    public function delete(Request $request, EntityManagerInterface $em, UserRepository $userRepository, TripRepository $tripRepository, $idUser, $id)
    {
        //$trip = $tripRepository->find($id);
        $user = $userRepository->findAllTripsByUser($idUser);
        $trip = $tripRepository->find($id);
        
        if (!empty($trip)) {
            $creator = $trip->getCreator();
            $creatorId = $creator->getId();
            $participant = 0;

            $tripsUser = $trip->getUsers();

            // si l'un des participants est la personne qui consulte la page $participant = 1
            foreach ($tripsUser as $userTrip) {
                $i = $userTrip->getId();
                if ($i==$idUser) {
                    $participant =+1;
                }
            }
        
            // si le voyage existe, si le user est un participant et si ce n'est pas le créateur
            if ((!empty($trip)) && ($participant > 0) && ($creatorId != $idUser)) {
                try {
                    $user->removeTrip($trip);
                    $em->persist($user);
                    $em->flush();
                    return $this->json($trip, 200, [], ['groups' => 'apiV0-trip']);
                } catch (NotEncodableValueException $e) {
                    return $this->json([
                        'status' => 400,
                        'message'=>$e->getMessage()
                    ], 400);
                }
            } elseif ((!empty($trip)) && (count($tripsUser) <= 1) && ($creatorId == $idUser)) {
                try {
                    $user->removeTrip($trip);
                    $em->remove($trip);
                    $em->flush();
                    return $this->json($trip, 200, [], ['groups' => 'apiV0-trip']);
                } catch (NotEncodableValueException $e) {
                    return $this->json([
                        'status' => 400,
                        'message'=>$e->getMessage()
                    ], 400);
                }
            } else {
                return $this->json([
                    'status' => 403,
                    'message'=>"Vous n'avez pas le droit de faire cette action."
                ], 403);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"ce voyage n'existe pas."
            ], 400);

        }    
        
    }

    
}
