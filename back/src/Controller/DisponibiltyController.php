<?php

namespace App\Controller;

use App\Entity\Disponibility;
use App\Form\DisponibilityType;
use App\Repository\DisponibilityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DisponibiltyController extends AbstractController
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
     * @Route("/api/v0/disponibilities", name="api_v0_animes_new", methods="POST")
     */
    public function new(ObjectNormalizer $normalizer, Request $request)
    {
        // Tout comme avant, on doit créer un objet Anime
        $disponibility = new Disponibility();
        // On crée également un formulaire pour se faciliter la gestion des données reçues
        // On ajoute une option inhabituelle pour désactiver le CSRF
        $form = $this->createForm(DisponibilityType::class, $disponibility, ['csrf_protection' => false]);

        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();
        // On transforme ce json en array
        $jsonArray = json_decode($jsonText, true);

        // $jsonArray est un tableau contenant tous les champs du formulaire
        // Ces champs doivent être structurés comme dans le formulaire,
        // il faudra donc l'expliquer aux dev du front
        // On envoie ce tableau à la méthode submit()
        $form->submit($jsonArray);

        // dd($anime, $form->isValid(), $form);

        // On vérifie si le formulaire est valide, toutes les données reçues sont bonnes
        if ($form->isValid()) {
            // Si c'est valide, on persiste et on flushe
            $em = $this->getDoctrine()->getManager();
            $em->persist($disponibility);
            $em->flush();

            // On retourne une 201 avec l'objet qu'on vient de créer
            // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
            $serializer = new Serializer([$normalizer]);
            // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
            $normalizedDisponibility = $serializer->normalize($disponibility, null, ['groups' => 'apiV0']);
            return $this->json($normalizedDisponibility, 201);
        }
        // Si ce n'est pas valide, on affiche les erreurs
        // la méthode ->getErrors() permet d»boetnir les erreurs d'un formulaire
        // Cependant elle conserve l'arborescence entre les champs
        // Avec l'option true (premier argument), on précise qu'on veut toutes les erreurs sur une seul niveau
        // Avec le false (deuxième argument), on arrive à retrouver une forme de structure dans les champs, suivi de leurs erreurs
        // Si on parse le résultat de getErrors en chaine de carectéres, on obtient un message lisible par un humain
        // parse : c'est comme faire `echo $form->getErrors(true, false);`
        return $this->json((string) $form->getErrors(true, false), 400);
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