<?php

namespace App\Controller;

use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CategoryController extends AbstractController
{
    /**
     * @Route("/api/v0/categories", name="api_v0_users_categories_list", methods="GET")
     */
    public function list(CategoryRepository $categoryRepository, SerializerInterface $serializer)
    {
        // On demande à Doctrine tous les voyages
        $categories = $categoryRepository->findAll();

        $json = $serializer->serialize($categories, 'json', ['groups' => 'apiV0_categories']);
        
        $response = new JsonResponse($json, 200, [], true);

        return $response;
    }
}