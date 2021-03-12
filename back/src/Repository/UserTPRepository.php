<?php

namespace App\Repository;

use App\Entity\UserTP;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method UserTP|null find($id, $lockMode = null, $lockVersion = null)
 * @method UserTP|null findOneBy(array $criteria, array $orderBy = null)
 * @method UserTP[]    findAll()
 * @method UserTP[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserTPRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserTP::class);
    }

    // /**
    //  * @return UserTP[] Returns an array of UserTP objects
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
    public function findOneBySomeField($value): ?UserTP
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
