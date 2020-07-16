<?php

namespace App\Repository;

use App\Entity\Activity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Activity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Activity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Activity[]    findAll()
 * @method Activity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Activity::class);
    }

    /**
     * @return Activity[] Returns an array of Activity objects
     */
    
    public function findAllByTrip($id)
    {
        $builder = $this->createQueryBuilder('activity');
        // je souhaite sécuriser le parametre $id
        $builder->where("activity.trip_id = :tripId");
        // je precise au builder quelle valeur "injecter" dans le parametre :animeId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("tripId", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->categories
    //    $builder->leftJoin('user.trip', 'trip');
        // je demande a doctrien d'alimenter les objets de type Category dans mon objet Anime
    //    $builder->addSelect('trip');

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
        ;
    }
    /*
    public function findOneBySomeField($value): ?Activity
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
