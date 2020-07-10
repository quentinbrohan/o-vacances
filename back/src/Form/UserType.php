<?php

namespace App\Form;

use App\Entity\Activity;
use App\Entity\Disponibility;
use App\Entity\Suggestion;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email')
            ->add('roles')
            ->add('password')
            ->add('lastname')
            ->add('firstname')
            ->add('avatar')
            ->add('suggestions',
                EntityType::class, [
                    "class" => Suggestion::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('disponibility',
                EntityType::class, [
                    "class" => Disponibility::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('trip',
                EntityType::class, [
                    "class" => Trip::class,
                    "required" => false,
                    'multiple' => true
                ])
            ->add('activity',
                EntityType::class, [
                    "class" => Activity::class,
                    "required" => false,
                    'multiple' => true
                ])

        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'multiple' => true
        ]);
    }
}
