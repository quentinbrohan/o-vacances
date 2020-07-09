<?php

namespace App\Controller\Api;

use App\Entity\Trip;
use App\Form\TripType;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;

class TripController extends AbstractController
{
    /**
     * @Route("/api/v0/trips?user_id={id}", name="api_v0_trips_list", methods="GET")
     */
    /*
    public function list(TripRepository $tripRepository, ObjectNormalizer $normalizer, $id)
    {
        // On demande à Doctrine tous les voyages
        $trips = $tripRepository->findTripWithUser($id);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedTrips = $serializer->normalize($trips, null, ['groups' => 'apiV0_list']);

        return $this->json($normalizedTrips);
    } */

    /**
     * @Route("/api/v0/trips/{id}", name="api_v0_trips_show", methods="GET")
    */
    public function show(TripRepository $tripRepository, ObjectNormalizer $normalizer, $id)
    {
        // On demande à Doctrine le voyage
        $trip = $tripRepository->find($id);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedTrips = $serializer->normalize($trip, null, ['groups' => 'apiV0_trip']);

        return $this->json($normalizedTrips);
    }

    /**
     * @Route("/api/v0/trips/{id}", name="api_v0_trips_edit", methods="PATCH")
    */
    public function edit(TripRepository $tripRepository, ObjectNormalizer $normalizer, Request $request, $id)
    {
        // On demande à Doctrine le voyage
        $trip = $tripRepository->find($id);

        $form = $this->createForm(TripType::class, $trip);

        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();
        // On transforme ce json en array
        $jsonArray = json_decode($jsonText, true);

        // $jsonArray est un tableau contenant tous les champs du formulaire
        // Ces champs doivent être structurés comme dans le formulaire,
        // il faudra donc l'expliquer aux dev du front
        // On envoie ce tableau à la méthode submit()
        $form->submit($jsonArray);

        // On vérifie si le formulaire est valide, toutes les données reçues sont bonnes
        if ($form->isValid()) {
            // Si c'est valide, on persiste et on flushe
            $em = $this->getDoctrine()->getManager();
            $em->persist($trip);
            $em->flush();

            // On retourne une 201 avec l'objet qu'on vient de créer
            // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
            $serializer = new Serializer([$normalizer]);
            // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
            $normalizedTrip = $serializer->normalize($trip, null, ['groups' => 'apiV0_list']);
            return $this->json($normalizedTrip, 201);
        }
     
        return $this->json((string) $form->getErrors(true, false), 400);
    }


    /**
     * @Route("/api/v0/trips", name="api_v0_trips_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        $jsonRecu = $request->getContent();
        
        try {
            $trip = $serializer->deserialize($jsonRecu, Trip::class, 'json');

            
            
            $em->persist($trip);
            $em->flush();

            return $this->json($trip, 201, [], ['groups' => 'apiV0_trip']);
        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }

        // $trip = new Trip();
        
        // $form = $this->createForm(TripType::class, $trip);

        // // On extrait de la requête le json reçu
        // $jsonText = $request->getContent();
        // // On transforme ce json en array
        // $jsonArray = json_decode($jsonText, true);

        // // $jsonArray est un tableau contenant tous les champs du formulaire
        // // Ces champs doivent être structurés comme dans le formulaire,
        // // il faudra donc l'expliquer aux dev du front
        // // On envoie ce tableau à la méthode submit()
        // $form->submit($jsonArray);

        // // On vérifie si le formulaire est valide, toutes les données reçues sont bonnes
        // if ($form->isValid()) {
        //     // Si c'est valide, on persiste et on flushe
        //     $em = $this->getDoctrine()->getManager();
        //     $em->persist($trip);
        //     $em->flush();

        //     // On retourne une 201 avec l'objet qu'on vient de créer
        //     // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        //     $serializer = new Serializer([$normalizer]);
        //     // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        //     $normalizedTrip = $serializer->normalize($trip, null, ['groups' => 'apiV0_list']);
        //     return $this->json($normalizedTrip, 201);
        // }
     
        // return $this->json((string) $form->getErrors(true, false), 400);
    }
    
    /**
     * @Route("/api/v0/trips", name="api_v0_trips_new", methods="POST")
     */
    public function delete(ObjectNormalizer $normalizer, Request $request)
    {
        
        $trip = new Trip();
        
        $form = $this->createForm(TripType::class, $trip);

        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();
        // On transforme ce json en array
        $jsonArray = json_decode($jsonText, true);

        // $jsonArray est un tableau contenant tous les champs du formulaire
        // Ces champs doivent être structurés comme dans le formulaire,
        // il faudra donc l'expliquer aux dev du front
        // On envoie ce tableau à la méthode submit()
        $form->submit($jsonArray);

        // On vérifie si le formulaire est valide, toutes les données reçues sont bonnes
        if ($form->isValid()) {
            // Si c'est valide, on persiste et on flushe
            $em = $this->getDoctrine()->getManager();
            $em->persist($trip);
            $em->flush();

            // On retourne une 201 avec l'objet qu'on vient de créer
            // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
            $serializer = new Serializer([$normalizer]);
            // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
            $normalizedTrip = $serializer->normalize($trip, null, ['groups' => 'apiV0_list']);
            return $this->json($normalizedTrip, 201);
        }
     
        return $this->json((string) $form->getErrors(true, false), 400);
    }

}
