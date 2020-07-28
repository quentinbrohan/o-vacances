<?php

namespace App\Controller;

use App\Entity\Suggestion;
use App\Form\SuggestionType;
use App\Repository\SuggestionRepository;
use App\Repository\TripRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\SerializerInterface;

class SuggestionController extends AbstractController
{
    /**
    * @Route("/api/v0/trips/{id}/suggestions", name="api_v0_suggestions_list", methods="GET")
    */
    public function list(TripRepository $tripRepository, SerializerInterface $serializer, SuggestionRepository $suggestionRepository, ObjectNormalizer $normalizer, $id)
    {
        $trip = $tripRepository->find($id);
        if (!empty($trip)) {
            $suggestions = $suggestionRepository->findAllSuggestionsByTrip($id);

            $json = $serializer->serialize($suggestions, 'json', ['groups' => 'apiV0_Suggestion']);
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
     * @Route("api/v0/trips/{id}/suggestions/new", name="api_v0_suggestions_new", methods="POST")
     */
    public function new(Request $request, ObjectNormalizer $normalizer, TripRepository $tripRepository, $id)
    {
        $trip = $tripRepository->find($id);

        if (!empty($trip)) {
            // Je créer un objet vide qui sera géré (et rempli) par le formulaire
            $newSuggestion = new Suggestion();
            // je crée un formulaire a partir de mon modèle (du Type) SuggestionType
            // je fourni en meme temps a ce nouveau formulaire l'objet qu'il doit gérer
            $form = $this->createForm(SuggestionType::class, $newSuggestion, ['csrf_protection' => false]);
            $jsonText = $request->getContent();
       
            $jsonArray = json_decode($jsonText, true);
      
            $form->submit($jsonArray);

            $newSuggestion->setCreatedAt(new \DateTime('now'));

            if ($form->isSubmitted() && $form->isValid()) {
                // on traite le formulaire
                // par exemple on l'envoi dans la BDD
                $newSuggestion->setTrip($trip);
                $entitymanager = $this->getDoctrine()->getManager();
                $entitymanager->persist($newSuggestion);
                $entitymanager->flush();
          
                $serializer = new Serializer([$normalizer]);

                $normalizerSuggestion = $serializer->normalize($newSuggestion, null, ['groups'=> 'apiV0_Suggestion']);
           
                return $this->json($normalizerSuggestion, 201);
            }
            return $this->json((string) $form->getErrors(true, false), 400);

        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Ce voyage n'existe pas"
            ], 400);
        }
    }

    /**
     * @Route("api/v0/users/{idUser}/trips/{id}/suggestions/{idSuggestion}", name="api_v0_suggestions_edit", methods="PATCH")
     */
    public function update(Request $request, $id, $idSuggestion, $idUser, SuggestionRepository $suggestionRepository, TripRepository $tripRepository, UserRepository $userRepository, ObjectNormalizer $normalizer) : Response
    {
        $suggestion = $suggestionRepository->find($idSuggestion);
        $trip = $tripRepository->find($id);
        $creator = $suggestion->getUser();
        $creatorId = $creator->getId();
        $visitor = $userRepository ->find($idUser);
        $visitorId = $visitor->getId();

        if((!empty($trip)) && (!empty($suggestion)) && ($visitorId === $creatorId )){

            $form = $this->createForm(SuggestionType::class, $suggestion);

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
                $suggestion->setTrip($trip);
                $suggestion->setUser($creator);
                $em = $this->getDoctrine()->getManager();
                $em->persist($suggestion);
                $em->flush();

                // On retourne une 201 avec l'objet qu'on vient de créer
                // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
                $serializer = new Serializer([$normalizer]);
                // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
                $normalizedSuggestion = $serializer->normalize($suggestion, null, ['groups' => 'apiV0_Suggestion']);
                return $this->json($normalizedSuggestion, 201);
            }
            return $this->json((string) $form->getErrors(true, false), 400);

        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas effectuer cette action"
            ], 400);
        }
    }

    /**
     * @Route("api/v0/users/{idUser}/trips/{idTrip}/suggestions/{id}/delete", name="api_v0_suggestions_delete", methods={"DELETE"})
     */
    public function delete(EntityManagerInterface $em, Suggestion $suggestion, TripRepository $tripRepository, UserRepository $userRepository, $idTrip, $idUser)
    {
        $trip = $tripRepository->find($idTrip);
        // récupération de l'auteur de la suggestion
        $creator = $suggestion->getUser();
        $creatorId = $creator->getId();
        // récupération du visiteur
        $visitor = $userRepository ->find($idUser);
        $visitorId = $visitor->getId();
        // recupération du créateur du voyage
        $creatorTrip = $trip->getCreator();
        $creatorTripId = $creatorTrip->getId();

        if ((!empty($trip)) && (!empty($suggestion))) {
            if(($visitorId === $creatorTripId) || ($visitorId === $creatorId)){
                try {
                    $trip->removeSuggestion($suggestion);
                    $em->remove($suggestion);
                    $em->persist($trip);
                    $em->flush();
                    return $this->json($suggestion, 200, [], ['groups' => 'apiV0-suggestion']);
                } catch (NotEncodableValueException $e) {
                    return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
                }
            } else {
                return $this->json([
                    'status' => 403,
                    'message'=>"Vous ne pouvez pas effectuer cette action"
                ], 403);
            }

        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Vous ne pouvez pas effectuer cette action"
            ], 400);
        }
    }
}

