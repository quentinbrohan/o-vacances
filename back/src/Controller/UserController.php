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
     * @Route("/api/v0/users/all", name="api_v0_user_list", methods="GET")
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
     * @Route("/api/v0/users/login", name="api_v0_user_new", methods="GET")
     */
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder, ObjectNormalizer $normalizer): Response
    {
        
        $user = $this->getUser();

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

            $normalizerUser = $serializer->normalize($user, null, ['groups'=> 'apiV0_list']);
           
            return $this->json($normalizerUser, 201);
        }
        
        return $this->json((string) $form->getErrors(true, false), 400);
    }

    /**
     * @Route("api/v0/users/{id}/edit", name="api_user_edit", methods={"PATCH"})
     */
    public function edit(Request $request, User $user, UserRepository $userRepository, $id, ObjectNormalizer $normalizer): Response
    {
        $user = $userRepository->find($id);

        $form = $this->createForm(UserType::class, $user);

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
            $em->persist($user);
            $em->flush();

            // On retourne une 201 avec l'objet qu'on vient de créer
            // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
            $serializer = new Serializer([$normalizer]);
            // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
            $normalizedUser = $serializer->normalize($user, null, ['groups' => 'apiV0_list']);
            return $this->json($normalizedUser, 201);
        }
     
        return $this->json((string) $form->getErrors(true, false), 400);
    }

    /**
     * @Route("api/v0/user/{id}/profil", name="api_user_profil", methods="GET")
     */
    public function show(User $user, $id, UserRepository $userRepository, ObjectNormalizer $normalizer): Response
    {
        $user = $userRepository->find($id);

        // On instancie un serializer en lui précisant un normalizer adapté aux objets PHP
        $serializer = new Serializer([$normalizer]);
        // Parce qu'on a précisé le normalizer, on peut normaliser selon un groupe
        $normalizedUsers = $serializer->normalize($user, null, ['groups' => 'apiV0_user']);

        return $this->json($normalizedUsers);
    }

    /**
     * @Route("api/v0/user/{id}/delete", name="api_user_delete", methods="DELETE")
     */
    public function delete( User $user, UserRepository $userRepository, ObjectNormalizer $normalizer, $id): Response
    {
        $user = $userRepository->find($id);
        
        return $this->json(200);

        $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();
    }
}