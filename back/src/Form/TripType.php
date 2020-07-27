<?php

namespace App\Form;

use App\Entity\Activity;
use App\Entity\Disponibility;
use App\Entity\Suggestion;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TripType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

/*             ->add('title')
            ->add('description')
            ->add('startDate',
                DateTimeType::class)
            ->add('endDate')
            ->add('location')
 */            ->add('picture', 
                FileType::class, [
                    'mapped' => false,
            ])

/*             ->add('users',
                EntityType::class, [
                    "class" => User::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('activities',
                EntityType::class, [
                    "class" => Activity::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('disponibility',
                EntityType::class, [
                    "class" => Disponibility::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('suggestion',
                EntityType::class, [
                    "class" => Suggestion::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('creator')
 */        ;

    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Trip::class,
            'csrf_protection' =>false,
        ]);
    }
}
