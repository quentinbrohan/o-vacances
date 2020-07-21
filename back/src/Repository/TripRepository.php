<?php

namespace App\Repository;

use App\Entity\Trip;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Trip|null find($id, $lockMode = null, $lockVersion = null)
 * @method Trip|null findOneBy(array $criteria, array $orderBy = null)
 * @method Trip[]    findAll()
 * @method Trip[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class TripRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Trip::class);
    }

    public function findAllDispoByTrips($id)
    {
        $builder = $this->createQueryBuilder('trip');
        // je souhaite sécuriser le parametre $id
        $builder->where("trip.id = :tripId");
        // je precise au builder quelle valeur "injecter" dans le parametre :tripId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("tripId", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->disponibility
        $builder->leftJoin('trip.disponibility', 'disponibility');
        // je demande a doctrine d'alimenter les objets de type Disponibility dans mon objet Trip
        $builder->addSelect('disponibility');

        // Je demande a doctrine de faire la jointure avec la relation ->users
        $builder->leftJoin('disponibility.users', 'user');
        // je demande a doctrine d'alimenter les objets de type users dans mon objet Trip
        $builder->addSelect('user');

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();

    } 

    public function findWithAllData($id)
    {
        $builder = $this->createQueryBuilder('trip');
        // je souhaite sécuriser le parametre $id
        $builder->where("trip.id = :id");
        // je precise au builder quelle valeur "injecter" dans le parametre :animeId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("id", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->creator
        $builder->leftJoin('trip.creator', 'creator');
        // je demande a doctrine d'alimenter les objets de type creator dans mon objet Trip
        $builder->addSelect('creator');

        // Je demande a doctrine de faire la jointure avec la relation ->user
        $builder->leftJoin('trip.users', 'users');
        // je demande a doctrine d'alimenter les objets de type user dans mon objet Trip
        $builder->addSelect('user');
       
        // Je demande a doctrine de faire la jointure avec la relation activity
        $builder->leftJoin('trip.activities', 'activity');
        // je demande a doctrine d'alimenter les objets de type activity dans mon objet Trip
        $builder->addSelect('activity');

        // Je demande a doctrine de faire la jointure avec la relation suggestion
        $builder->leftJoin('trip.suggestion', 'suggestion');
        // je demande a doctrine d'alimenter les objets de type suggestion dans mon objet Trip
        $builder->addSelect('suggestion');


        // Je demande a doctrine de faire la jointure avec la relation ->disponibility
        $builder->leftJoin('trip.disponibility', 'disponibility');
        // je demande a doctrine d'alimenter les objets de type Disponibility dans mon objet Trip
        $builder->addSelect('disponibility');

        // Je demande a doctrine de faire la jointure avec la relation ->users
        $builder->leftJoin('disponibility.users', 'user');
        // je demande a doctrine d'alimenter les objets de type users dans mon objet Trip
        $builder->addSelect('user');
        

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
        
    }

    public function findAllActivitiesByTrips($id){
        $builder = $this->createQueryBuilder('trip');
        // je souhaite sécuriser le parametre $id
        $builder->where("trip.id = :tripId");
        // je precise au builder quelle valeur "injecter" dans le parametre :tripId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("tripId", $id);
        // Je demande a doctrine de faire la jointure avec la relation ->disponibility
        $builder->leftJoin('trip.activity', 'activity');    
        // je demande a doctrine d'alimenter les objets de type Disponibility dans mon objet Trip
        $builder->addSelect('activity');
        // Je demande a doctrine de faire la jointure avec la relation ->trip
        $builder->leftJoin('activity.trip', 'trip');    
        // je demande a doctrine d'alimenter les objets de type trip dans mon objet User
        $builder->addSelect('trip');
        // on recupère la requete construite
        $query = $builder->getQuery();
        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
    }

     public function findAllUsersByTrip($id)
    {
        $builder = $this->createQueryBuilder('trip');
        // je souhaite sécuriser le parametre $id
        $builder->where("trip.id = :tripId");
        // je precise au builder quelle valeur "injecter" dans le parametre :tripId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("tripId", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->disponibility
        $builder->leftJoin('trip.users', 'users');    
        // je demande a doctrine d'alimenter les objets de type Disponibility dans mon objet Trip
        $builder->addSelect('users');
        // Je demande a doctrine de faire la jointure avec la relation ->trip

        $query = $builder->getQuery();
        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();

    }
 
    // /**
    // * @return Trip[] Returns an array of Trip objects
    // */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('t.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Trip
    {
        return $this->createQueryBuilder('t')
            ->andWhere('t.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
