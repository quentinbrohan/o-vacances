<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(UserInterface $user, string $newEncodedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', \get_class($user)));
        }

        $user->setPassword($newEncodedPassword);
        $this->_em->persist($user);
        $this->_em->flush();
    }

    
    public function findAllTripsByUser($id)
    {
        $builder = $this->createQueryBuilder('user');
        // je souhaite sécuriser le parametre $id
        $builder->where("user.id = :userId");
        // je precise au builder quelle valeur "injecter" dans le parametre :userId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("userId", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->trip
        $builder->leftJoin('user.trip', 'trip');
        // je demande a doctrine d'alimenter les objets de type Trip dans mon objet User
        $builder->addSelect('trip');

        $builder->orderBy('trip.startDate', 'ASC');

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
        
    }

    public function findByEmail($email)
    {
        $builder = $this->createQueryBuilder('user');
        // je souhaite sécuriser le parametre $id
        $builder->where("user.email = :userEmail");
        // je precise au builder quelle valeur "injecter" dans le parametre :userId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("userEmail", $email);

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
        ;
    }

    public function findAllDispoByUsers($id){

        $builder = $this->createQueryBuilder('user');
        // je souhaite sécuriser le parametre $id
        $builder->where("user.id = :userId");
        // je precise au builder quelle valeur "injecter" dans le parametre :userId
        // Cette methode sécurise le contenu de la variable $id (echapment de car spéciaux ...)
        $builder->setParameter("userId", $id);

        // Je demande a doctrine de faire la jointure avec la relation ->disponibility
        $builder->leftJoin('user.disponibility', 'disponibility');    
        // je demande a doctrine d'alimenter les objets de type Disponibility dans mon objet Trip
        $builder->addSelect('disponibility');

        // Je demande a doctrine de faire la jointure avec la relation ->trip
        $builder->leftJoin('disponibility.trip', 'trip');    
        // je demande a doctrine d'alimenter les objets de type trip dans mon objet User
        $builder->addSelect('trip');
        

        // on recupère la requete construite
        $query = $builder->getQuery();

        // je demande a doctrine d'éxecuter le requete et de me renvoyer les resultats
        return $query->getOneOrNullResult();
    }


    // /**
    //  * @return User[] Returns an array of User objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?User
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
