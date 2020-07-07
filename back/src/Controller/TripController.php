<?php

namespace App\Controller;

use App\Repository\TripRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class TripController extends AbstractController
{
    /**
     * @Route("/api/v0/trips?user_id={id}", name="api_v0_trips_list", methods="GET")
     */
    public function list(TripRepository $tripRepository, ObjectNormalizer $normalizer)
    {
    
        $trips = $tripRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedTrips = $serializer->normalize($trips, null, ['groups' => 'apiV0']);

        // dd($normalizedAnimes);

        return $this->json($normalizedTrips);
        
        
    }
}
