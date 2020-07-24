<?php

namespace App\Controller;

use App\Entity\Disponibility;
use App\Form\DisponibilityType;
use App\Entity\Trip;
use App\Entity\User;
use App\Repository\DisponibilityRepository;
use App\Repository\TripRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DisponibiltyController extends AbstractController
{
    /**
     * @Route("/api/v0/trips/{id}/disponibilities", name="api_v0_disponibilities_trip_list", methods="GET")
     */
    public function list(SerializerInterface $serializer, $id, TripRepository $tripRepository)
    {
        $trip = $tripRepository->find($id);
        if (!empty($trip)) {
            $disponibilities = $tripRepository->findAllDispoByTrips($id);

            $json = $serializer->serialize($disponibilities, 'json', ['groups' => 'apiV0_dispoByTrip']);
        
            $response = new JsonResponse($json, 200, [], true);
            return $response;
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Ce voyage n'existe pas"
            ], 400);
        }
    }

    /**
     * @Route("/api/v0/users/{id}/disponibilities", name="api_v0_disponibilities_user_list", methods="GET")
     */
    public function listUserDisponibility(UserRepository $userRepository, SerializerInterface $serializer, $id)
    {
        $user = $userRepository->find($id);

        if (!empty($user)) {
            $disponibilities = $userRepository->findAllDispoByUsers($id);

            $json = $serializer->serialize($disponibilities, 'json', ['groups' => 'apiV0_dispoByUser']);
        
            $response = new JsonResponse($json, 200, [], true);
            return $response;
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas faire cette action"
            ], 400);

        }
    }

    /**
     * @Route("/api/v0/users/{id}/disponibilities", name="api_v0_disponibilities_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, UserRepository $userRepository, TripRepository $tripRepository, $id)
    {
        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();
        $jsonArray = json_decode($jsonText, true);

        $idTrip = $jsonArray['trip'];
        $trip = $tripRepository->find($idTrip);

        $user = $userRepository->find($id);

        if ((!empty($trip)) && (!empty($user))) {
            try {
                // on crée une nouvelle entité Disponibility avec le serializer
                $disponibility = $serializer->deserialize($jsonText, Disponibility::class, 'json');

                $disponibility->addUser($user);


                $disponibility->setTrip($trip);
             
                // validation des données de $disponibility en fonction des Asserts des entités
                $errors = $validator->validate($disponibility);

                // s'il y a des erreurs
                if (count($errors) > 0) {
                    return $this->json($errors, 400);
                }

                $em->persist($disponibility);
                $em->flush();
                return $this->json($disponibility, 201, [], ['groups' => 'apiV0-dispo']);

            } catch (NotEncodableValueException $e) {
                return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
            }

        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas faire cette action"
            ], 400);

        }
    }

    /**
     * @Route("api/v0/users/{idUser}/disponibilities/{id}", name="api_v0_disponibilities_user_edit", methods="PATCH")
     */
    public function edit(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, $id, $idUser, DisponibilityRepository $disponibilityRepository, TripRepository $tripRepository, UserRepository $userRepository)
    {
        $disponibility = $disponibilityRepository->find($id);
        $user = $userRepository->find($idUser);

        if ((!empty($disponibility)) && (!empty($user))) {
            // On extrait de la requête le json reçu
            $jsonText = $request->getContent();
            $jsonArray = json_decode($jsonText, true);

            $tripId = $jsonArray['trip'];
            $trip = $tripRepository->find($tripId);
            
            try {
                // on mofifie l'entité Disponibility avec le serializer
                $updatedDisponibility = $serializer->deserialize($jsonText, Disponibility::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $disponibility]);
               
                $updatedDisponibility->addUser($user);

                $updatedDisponibility->setTrip($trip);
                
                // validation des données de $disponibility en fonction des Asserts des entités
                $errors = $validator->validate($updatedDisponibility);

                // s'il y a des erreurs
                if (count($errors) > 0) {
                    return $this->json($errors, 400);
                }

                $em->persist($updatedDisponibility);
                $em->flush();
                return $this->json($updatedDisponibility, 201, [], ['groups' => 'apiV0-dispo']);
            } catch (NotEncodableValueException $e) {
                return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas faire cette action"
            ], 400);
        }
    }

    /**
     * @Route("api/v0/users/{idUser}/disponibilities/{id}", name="api_v0_disponibilities_user_delete", methods={"DELETE"})
     */
    public function delete(Request $request, EntityManagerInterface $em, Disponibility $disponibility, UserRepository $userRepository, $idUser)
    {
        $user = $userRepository->findAllDispoByUsers($idUser);
        
        if (!empty($user)){
            try {
                $user->removeDisponibility($disponibility);
                $em->persist($disponibility);
                $em->flush();
                return $this->json($disponibility, 201, [], ['groups' => 'apiV0-dispo']);
            } catch (NotEncodableValueException $e) {
                return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas faire cette action"
            ], 400);
        }
        
    }

    /**
     * @Route("api/v0/disponibilities/{id}", name="api_v0_disponibilities_delete", methods={"DELETE"})
     */
    public function deleteDisponibility(Request $request, EntityManagerInterface $em, Disponibility $disponibility, UserRepository $userRepository)
    {
        if (!empty($disponibility)){
            try {
                $em->remove($disponibility);
                $em->flush();
                return $this->json($disponibility, 200, [], ['groups' => 'apiV0-dispo']);
            } catch (NotEncodableValueException $e) {
                return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Cette disponibilité n'existe pas"
            ], 400);
        }
        
    }

}