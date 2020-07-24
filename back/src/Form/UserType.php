<?php

namespace App\Form;

use App\Entity\Activity;
use App\Entity\Disponibility;
use App\Entity\Suggestion;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;


class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('email')
            ->add('roles', null, ['empty_data' => []])
            ->add('password')
            ->add('lastname',)
            ->add('firstname',)
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

                ->addEventListener(FormEvents::POST_SET_DATA, function(FormEvent $event) {
                    // On récupère le formulaire et l'objet associé
                    $form = $event->getForm();
                    $user = $event->getData();
               
                if ($user->getId() === null) {
                  
                    $form->remove('roles');
                   
                }

            })

            
        ;
        
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'multiple' => true,
            'csrf_protection' => false,
            "allow_extra_fields" => true
        ]);
    }
}
