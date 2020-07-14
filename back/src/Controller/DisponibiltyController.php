<?php

namespace App\Controller;

use App\Entity\Disponibility;
use App\Repository\DisponibilityRepository;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class DisponibiltyController extends AbstractController
{
    /**
     * @Route("/api/v0/trips/{id}/disponibilities", name="api_v0_disponibilities_trip_list", methods="GET")
     */
    public function list(TripRepository $tripRepository, SerializerInterface $serializer, $id)
    {
        $disponibilities = $tripRepository->findAllDispoByTrips($id);

        $json = $serializer->serialize($disponibilities, 'json', ['groups' => 'apiV0_dispoByTrip']);
        
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }

    /**
     * @Route("/api/v0/trips/{id}/disponibilities", name="api_v0_disponibilities_user_list", methods="GET")
     */
    public function listUserDisponibility(DisponibilityRepository $userRepository, ObjectNormalizer $normalizer)
    {
        $users = $userRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedUsers = $serializer->normalize($users, null, ['groups' => 'apiV0']);


        return $this->json($normalizedUsers);
    }

    /**
     * @Route("/api/v0/disponibilities", name="api_v0_animes_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();

        try {
            // on crée une nouvelle entité Disponibility avec le serializer
            $disponibility = $serializer->deserialize($jsonText, Disponibility::class, 'json');
            
            // validation des données de $disponibility en fonction des Asserts des entités
            $errors = $validator->validate($disponibility);

            // s'il y a des erreurs
            if(count($errors) > 0){
                return $this->json($errors, 400);
            }

            $em->persist($disponibility);
            $em->flush();
            return $this->json($disponibility, 201, [], ['groups' => 'apiV0']);

        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
        
            
        }
    }

    /**
     * @Route("api/v0/user/{id}/disponibilities/update", name="api_v0_dispobinilities_user_update", methods="PATCH")
     */
    public function update(Request $request, Disponibility $disponibility)
    {
        $form = $this->createForm(DisponibilityType::class, $disponibility);
        // je demande au form de verifier si des données ont été soumises
        $form->handleRequest($request);
        // Si des données ont été soumises ET qu'elles sont valides
        if ($form->isSubmitted() && $form->isValid()) {
            // on traite le formulaire
            // par exemple on l'envoi dans la BDD
            $manager = $this->getDoctrine()->getManager();
            $manager->flush();
            // puis on redirige sur une autre page, sinon le type va re tomber sur le form en pensant qu'il n'a pas marcher
            $this->addFlash("succes", "");
            return $this->redirectToRoute('category_view', ["id" => $disponibility->getId()]);
        }
    }

    /**
     * @Route("api/v0/user/{id}/disponibilities", name="channel_delete", methods={"DELETE"})
     */
    public function delete(Request $request, Disponibility $disponibility, ObjectNormalizer $normalizer): Response
    {
        if ($this->isCsrfTokenValid('delete'.$disponibility->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($disponibility);
            $entityManager->flush();

            $serializer = new Serializer([$normalizer]);
            // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
            $normalizedDisponibility = $serializer->normalize($disponibility, null, ['groups' => 'apiV0']);
            
            return $this->json($normalizedDisponibility, 201);
        }

        return $this->redirectToRoute('channel_index');
    }
}