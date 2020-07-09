<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Form\ActivityType;
use App\Repository\ActivityRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class ActivityController extends AbstractController
{
    /**
     * @Route("/api/v0/user/{id}/activities", name="api_v0_activity_list", methods="GET")
     */
    public function list(ActivityRepository $activityRepository, ObjectNormalizer $normalizer)
    {
        $activities = $activityRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedActivities = $serializer->normalize($activities, null, ['groups' => 'apiV0']);



        return $this->json($normalizedActivities);
    }

    /**
     * @Route("/api/v0/user/{id}/activities/new", name="api_v0_activities_new", methods="POST")
     */
    public function new(ObjectNormalizer $normalizer, Request $request)
    {
        $activity = new Activity();
        //désactiver csrf car pas envoi du form mais envoi en json
        $form = $this->createForm(ActivityType::class, $activity, ['csrf_protection' => false]);

        $jsonText = $request->getContent();

        $jsonArray = json_decode($jsonText, true);

        $form->submit($jsonArray);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($activity);
            $em->flush();
            $serializer = new Serializer([$normalizer]);
            $normalizedActivity = $serializer->normalize($activity, null, ['groups' => 'apiV0']);
            return $this->json($normalizedActivity, 201);
        }
        // la methode getErrors() permet d'obtenir les erreurs d'un formulaire tout en gardant l'arborescence entre les champs.
        // l'option true précise que l'on veut toutes les erreurs sur un seul niveau tandis que false permet de retrouver une forme de structure dans les champs
        return $this->json((string) $form->getErrors(true, false), 400);
    }

    /**
     * @Route("/api/v0/user/{id}/activities/update", name="api_v0_activities_update", methods="PATCH")
     */
    public function update(Request $request, Activity $activity)
    {
        $form = $this->createForm(ActivityType::class, $activity, ['csrf_protection' => false]);
        $form->handleRequest($request);
        if ($form->isSubmitted()&& $form->isValid()) {
            $manager = $this->getDoctrine()->getManager();
            $this->$manager->flush();
            return $this->redirectToRoute('activity_view', ["id" => $activity->getId()]);
        }
    }

    /**
     * @Route("api/v0/user/{id}/activities/delete", name="api_activity_delete", methods="DELETE")
     */
    public function deleteActivity(Activity $activity)
    {
        $manager = $this->getDoctrine()->getManager();
        $manager->remove($activity);
        $manager->flush();

        $this->addFlash("warning", "L'activité a bien été supprimée");
        return $this->redirectToRoute('api_activity_delete');
    }
}