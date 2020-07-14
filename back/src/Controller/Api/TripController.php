<?php

namespace App\Controller\Api;

use App\Entity\Trip;
use App\Form\TripType;
use App\Repository\TripRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
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
    public function list(UserRepository $userRepository, ObjectNormalizer $normalizer, $id)
    {
        // On demande à Doctrine tous les voyages
        $trips = $userRepository->findAllTripsByUser($id);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedTrips = $serializer->normalize($trips, null, ['groups' => 'apiV0_tripByUser']);

        return $this->json($normalizedTrips);
    } 

    /**
     * @Route("/api/v0/trips", name="api_v0_trips_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();

        try {
            // on crée une nouvelle entité Trip avec le serializer
            $trip = $serializer->deserialize($jsonText, Trip::class, 'json');
            
            // validation des données de $trips en fonction des Asserts des entités
            $errors = $validator->validate($trip);

            // s'il y a des erreurs
            if(count($errors) > 0){
                return $this->json($errors, 400);
            }

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
     * @Route("/api/v0/trips/{id}", name="api_v0_trips_show", methods="GET")
     */
    public function show(TripRepository $tripRepository, ObjectNormalizer $normalizer, Trip $trip)
    {
        // On demande à Doctrine le voyage
        $trip = $tripRepository->find($trip);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedTrips = $serializer->normalize($trip, null, ['groups' => 'apiV0_trip']);

        return $this->json($normalizedTrips);
    }

    /**
     * @Route("/api/v0/trips/{id}", name="api_v0_trips_edit", methods="PATCH")
     */
    public function edit(TripRepository $tripRepository, SerializerInterface $serializer, Request $request, $id, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        // On demande à Doctrine le voyage
        $trip = $tripRepository->find($id);

        if (!empty($trip)){

            // On extrait de la requête le json reçu
            $jsonText = $request->getContent();

            try {
                // on crée une nouvelle entité Trip avec le serializer
                $newTrip = $serializer->deserialize($jsonText, Trip::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $trip]);
               
                // validation des données de $trips en fonction des Asserts des entités
                $errors = $validator->validate($newTrip);

                // s'il y a des erreurs
                if(count($errors) > 0){
                    return $this->json($errors, 400);
                }
                
                $em->flush();
                return $this->json($newTrip, 201, [], ['groups' => 'apiV0_trip']);

            } catch(NotEncodableValueException $e) {
                return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
            }
        
        }

    
    }


    // todo Fonction suppression de voyage - a voir plus tard si necessaire
}
