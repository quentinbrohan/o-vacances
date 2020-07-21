<?php

namespace App\Controller;

use App\Entity\Suggestion;
use App\Form\SuggestionType;
use App\Repository\SuggestionRepository;
use App\Repository\TripRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Annotation\Groups;

class SuggestionController extends AbstractController
{
    /**
    * @Route("/api/v0/trips/{id}/suggestions", name="api_v0_suggestions_list", methods="GET")
    */
    public function list(SuggestionRepository $suggestionRepository, ObjectNormalizer $normalizer, $id)
    {
        $suggestions = $suggestionRepository->find($id);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedSuggestions = $serializer->normalize($suggestions, null, ['groups' => 'apiV0_Suggestion']);

        // dd($normalizedAnimes);

        return $this->json($normalizedSuggestions);
    }

    /**
     * @Route("api/v0/trips/{id}/suggestions/new", name="api_v0_suggestions_new", methods="POST")
     */
    public function new(Request $request, ObjectNormalizer $normalizer)
    {
        // Je créer un objet vide qui sera géré (et rempli) par le formulaire
        $newSuggestion = new Suggestion();
        // je crée un ofrmulaire a partir de mon modèle (du Type) AnimeCategoryType
        // je fourni en meme temps a ce nouveau formulaire l'objet qu'il doit gérer
        $form = $this->createForm(SuggestionType::class, $newSuggestion, ['csrf_protection' => false]);
        $jsonText = $request->getContent();
       
        $jsonArray = json_decode($jsonText, true);
      
        $form->submit($jsonArray);

        $newSuggestion->setCreatedAt(new \DateTime('now'));

        if ($form->isSubmitted() && $form->isValid()) {
            // on traite le formulaire
            // par exemple on l'envoi dans la BDD
            $entitymanager = $this->getDoctrine()->getManager();
            $entitymanager->persist($newSuggestion);
            $entitymanager->flush();
          
            $serializer = new Serializer([$normalizer]);

            $normalizerSuggestion = $serializer->normalize($newSuggestion, null, ['groups'=> 'apiV0_Suggestion']);
           
            return $this->json($normalizerSuggestion, 201);
        }
        return $this->json((string) $form->getErrors(true, false), 400);
    }

    /**
     * @Route("api/v0/trips/{id}/suggestions/edit", name="api_v0_suggestions_edit", methods="PATCH")
     */
    public function update(Request $request, Suggestion $suggestion, SuggestionRepository $suggestionRepository, $idTrip, $id, ObjectNormalizer $normalizer) : Response
    {
        $suggestion = $suggestionRepository->find($id);

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
    }
    /**
     * @Route("api/v0/trips/{idTrip}/suggestions/{id}/delete", name="api_v0_suggestions_delete", methods={"DELETE"})
     */
    public function delete(EntityManagerInterface $em, Suggestion $suggestion, TripRepository $tripRepository, $idTrip)
    {
        $trip = $tripRepository->find($idTrip);
        if (!empty($suggestion)) {
            try {
                $trip->removeSuggestion($suggestion);
                $em->remove($suggestion);
                $em->persist($trip);
                $em->flush();
                return $this->json($suggestion, 201, [], ['groups' => 'apiV0-suggestion']);
            } catch (NotEncodableValueException $e) {
                return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
            }
        } else {
            return $this->json([
                'status' => 400,
                'message'=>"Cette suggestion n'existe pas."
            ], 400);
        }
    }
}

