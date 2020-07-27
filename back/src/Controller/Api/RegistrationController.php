<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\UserType;
use App\Security\LoginFormAuthenticator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class RegistrationController extends AbstractController
{
    /**
     * @Route("/users/register", name="app_register", methods="POST")
     */
    public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, ObjectNormalizer $normalizer): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $jsonText = $request->getContent();

        $jsonArray = json_decode($jsonText, true);

        $form->submit($jsonArray);
        
        if ($form->isSubmitted() && $form->isValid()) {
            // encode the plain password
            $user->setRoles(['ROLE_USER']);
            $user->setPassword(
                $passwordEncoder->encodePassword(
                    $user,
                    $form->get('password')->getData()
                )
            );

            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();
            // do anything else you need here, like send an email

            $serializer = new Serializer([$normalizer]);

            $normalizerRegisteredUser = $serializer->normalize($user, null, ['groups'=> 'apiV0_list']);
           
            return $this->json($normalizerRegisteredUser, 201);

        }

        return $this->json((string) $form->getErrors(true, false), 400);
    }
}