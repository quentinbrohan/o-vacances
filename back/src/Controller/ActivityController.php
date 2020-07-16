<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\Category;
use App\Entity\Disponibility;
use App\Entity\Trip;
use App\Entity\User;
use App\Form\ActivityType;
use App\Repository\ActivityRepository;
use App\Repository\UserRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use PhpParser\Node\Stmt\Return_;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ActivityController extends AbstractController
{
    /**
     * @Route("/api/v0/trips/{id}/activities", name="api_v0_activities_list", methods="GET")
     */
    public function list(ActivityRepository $activityRepository, ObjectNormalizer $normalizer)
    {
        $activities = $activityRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedActivities = $serializer->normalize($activities, null, ['groups' => 'apiV0_activity']);



        return $this->json($normalizedActivities);
    }

    /**
     * @Route("/api/v0/trips/{id}/activities/new", name="api_v0_activities_new", methods="POST")
     */
    public function new(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, ValidatorInterface $validator, User $user, Category $category, Trip $trip)
    {
        // On extrait de la requête le json reçu
        $jsonText = $request->getContent();

        try {
            // on crée une nouvelle entité Activity avec le serializer
            $activity = $serializer->deserialize($jsonText, Activity::class, 'json');
            
            // validation des données de $activity en fonction des Asserts des entités
            $errors = $validator->validate($activity);

            // s'il y a des erreurs
            if(count($errors) > 0){
                return $this->json($errors, 400);
            }
            
            $activity->setCreator($user);
            $activity->setCategory($category);
            $activity->setTrip($trip);

            $em->persist($activity);
            $em->flush();
            return $this->json($activity, 201, [], ['groups' => 'apiV0_activity']);

        } catch(NotEncodableValueException $e) {
            return $this->json([
                'status' => 400,
                'message'=>$e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/api/v0/trips/{id}/activities/update", name="api_v0_activities_update", methods="PATCH")
     */
    public function edit(ActivityRepository $activityRepository, SerializerInterface $serializer, Request $request, $id, EntityManagerInterface $em, ValidatorInterface $validator)
    {
        // On demande à Doctrine l'activité
        $activity = $activityRepository->find($id);
        

        if (!empty($activity)){

            // On extrait de la requête le json reçu
            $jsonText = $request->getContent();

            try {
                // on crée une nouvelle entité Activity avec le serializer
                $newActivity = $serializer->deserialize($jsonText, Activity::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $activity]);
               
                // validation des données de $activity en fonction des Asserts des entités
                $errors = $validator->validate($newActivity);

                // s'il y a des erreurs
                if(count($errors) > 0){
                    return $this->json($errors, 400);
                }
                
                $em->flush();
                return $this->json($newActivity, 201, [], ['groups' => 'apiV0_activity']);

            } catch(NotEncodableValueException $e) {
                return $this->json([
                    'status' => 400,
                    'message'=>$e->getMessage()
                ], 400);
            }
        
        }

    
    }

    /**
     * @Route("api/v0/trips/{id}/activities/delete", name="api_v0_activities_delete", methods="DELETE")
     */
    public function deleteActivity(Activity $activity)
    {
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($activity);
        $manager->flush();

        $this->addFlash("warning", "L'activité a bien été supprimée");
        return $this->redirectToRoute('api_v0_activities_list');
    }
}
