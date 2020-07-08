<?php

namespace App\Form;

use App\Entity\Activity;
use App\Entity\Disponibility;
use App\Entity\Suggestion;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TripType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('startDate')
            ->add('endDate')
            ->add('location')
            ->add('picture')
            ->add('users',
                EntityType::class, [
                    "class" => User::class,
                    "required" => false
                ])
            ->add('activities',
                EntityType::class, [
                    "class" => Activity::class,
                    "required" => false
                ])
            ->add('disponibility',
                EntityType::class, [
                    "class" => Disponibility::class,
                    "required" => false
                ])
            ->add('suggestion',
                EntityType::class, [
                    "class" => Suggestion::class,
                    "required" => false
                ])
            ->add('creator')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Trip::class,
        ]);
    }
}
