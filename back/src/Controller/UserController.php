<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use App\Entity\User;
use App\Form\UserType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class UserController extends AbstractController
{
     /**
     * @Route("/api/v0/users", name="api_v0_user_list", methods="GET")
     */
    public function list(UserRepository $userRepository, ObjectNormalizer $normalizer)
    {
    
        $users = $userRepository->findAll();

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedUsers = $serializer->normalize($users, null, ['groups' => 'apiV0_list']);


        return $this->json($normalizedUsers);
        
        
    }

     /**
     * @Route("/api/v0/users/login", name="api_v0_user_new", methods={"GET","POST"})
     */
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder, ObjectNormalizer $normalizer): Response
    {
        $user = new User();
        $form = $this->createForm(UserType::class, $user);
        $jsonText = $request->getContent();
        
        $jsonArray = json_decode($jsonText, true);

        $form->submit($jsonArray);

        if ($form->isValid()) {
            // On a besoin d'hasher le mot de passe avant de le stocker en base de données
            // On récupère donc le mot de passe dans $user
            $password = $user->getPassword();
            // On va hasher le mot de passe
            $encodedPassword = $passwordEncoder->encodePassword($user, $password);
            // Puis on replace le mot de passe hashé dans $user
            $user->setPassword($encodedPassword);

            // On reprend le fil ordinaire des choses, en persistant et flush $user
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $serializer = new Serializer([$normalizer]);

            $normalizerNewUser = $serializer->normalize($user, null, ['groups'=> 'apiV0_list']);
            //rentrer le nom de la route où l'on veut rediriger
            return $this->json($normalizerNewUser, 201);
        }
        
        return $this->json((string) $form->getErrors(true, false), 400);
    }

    /**
     * @Route("api/v0/user/{id}/edit", name="api_user_edit", methods={"PATCH"})
     */
    public function edit(Request $request, User $user, UserPasswordEncoderInterface $passwordEncoder): Response
    {
        $form = $this->createForm(UserType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // On réencode le mot de passe avec la même technique que dans new() mais avec moins de lignes (en une seul instruction)
            $user->setPassword(
                $passwordEncoder->encodePassword($user, $user->getPassword())
            );

            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('user_index');
        }

        return $this->render('user/edit.html.twig', [
            'user' => $user,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("api/v0/user/{id}", name="api_user_show", methods={"GET"})
     */
    public function show(User $user): Response
    {
        return $this->render('user/show.html.twig', [
            'user' => $user,
        ]);
    }

    /**
     * @Route("api/v0/user/{id}/delete", name="api_user_delete", methods={"DELETE")
     */
    public function delete(Request $request, User $user): Response
    {
        if ($this->isCsrfTokenValid('delete'.$user->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
        }

        return $this->redirectToRoute('user_index');
    }
}