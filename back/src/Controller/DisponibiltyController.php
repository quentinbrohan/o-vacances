<?php

namespace App\Controller;

use App\Entity\Disponibility;
use App\Repository\DisponibilityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DisponibilityController extends AbstractController
{
    /**
     * @Route("/api/v0/trips/{id}/disponibilities", name="api_v0_disponibilities_trip_list", methods="GET")
     */
    public function list(DisponibilityRepository $userRepository, ObjectNormalizer $normalizer)
    {
        $users = $userRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedUsers = $serializer->normalize($users, null, ['groups' => 'apiV0']);


        return $this->json($normalizedUsers);
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
     * @Route("api/v0/user/{id}/disponibilities", name="api_v0_disponibilities_user_new", methods="POST")
     */
    public function new(Request $request)
    {
        // Je créer un objet vide qui sera géré (et rempli) par le formulaire
        $newDisponibility = new Disponibility();
        // je crée un ofrmulaire a partir de mon modèle (du Type) AnimeCategoryType
        // je fourni en meme temps a ce nouveau formulaire l'objet qu'il doit gérer
        $form = $this->createForm(AnimeCategoryType::class, $newDisponibility);
        // je demande au form de verifier si des données ont été soumises
        $form->handleRequest($request);
        // Si des données ont été soumises ET qu'elles sont valides
        if ($form->isSubmitted() && $form->isValid()) {
            // on traite le formulaire
            // par exemple on l'envoi dans la BDD
            $manager = $this->getDoctrine()->getManager();
            $manager->persist($newDisponibility);
            $manager->flush();
            // puis on redirige sur une autre page, sinon le type va re tomber sur le form en pensant qu'il n'a pas marcher
            $this->addFlash("success", "La nouvelle catégorie a bien été créée");
            //metre nom de route de view des dates ou du voyage
            return $this->redirectToRoute('category_view', ["id" => $newDisponibility ->getId()]);
        }

        // Si les données n'ont PAS été soumises ou que les donnée sont INCORRECTES
        // alors on affiche le formulaire (si les données étaient incorrecte le formulaire contient maintenant des erreur que l'on pourra afficher)
        
        return $this->render('', [
            "formView" => $form->createView()
        ]);
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
    public function delete(Request $request, Disponibility $disponibility): Response
    {
        if ($this->isCsrfTokenValid('delete'.$disponibility->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($disponibility);
            $entityManager->flush();
        }

        return $this->redirectToRoute('channel_index');
    }
}