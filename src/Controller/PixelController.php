<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PixelController extends AbstractController
{
    #[Route('/pixel', name: 'app_pixel')]
    public function index(): Response
    {
        return $this->render('pixel/index.html.twig', [
            'controller_name' => 'PixelController',
        ]);
    }
}
