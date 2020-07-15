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
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email')
            ->add('roles', null, ['empty_data' => []])
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

                ->addEventListener(FormEvents::POST_SET_DATA, function(FormEvent $event) {
                    // On récupère le formulaire et l'objet associé
                    $form = $event->getForm();
                    $user = $event->getData();
               
                if ($user->getId() === null) {
                    // On va pouvoir appliquer sur $form les méthodes
                    // ->add() et ->remove pour ajouter ou supprimer des champs

                    // Pour une inscription, l'utilisateur ne peux pas choisir son rôle
                    $form->remove('roles');
                    // Pour notre projet ici, on n'est tout à fait logiques,
                    // on va se casse la tête et on veut
                    // un champs password qui s'appelle plainPassword et non password
                    $form->remove('password');
                    $form->add('plainPassword', PasswordType::class, [
                        // instead of being set onto the object directly,
                        // this is read and encoded in the controller
                        'mapped' => false,
                        'constraints' => [
                            new NotBlank([
                                'message' => 'Veuillez entrer un mot de passe',
                            ]),
                            new Length([
                                'min' => 6,
                                'minMessage' => 'Votre mot de passe doit contenir au minimum {{ limit }} charactere',
                                // max length allowed by Symfony for security reasons
                                'max' => 4096,
                            ]),
                        ],
                    ]);
                  
                }

            })

            
        ;
        
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'multiple' => true,
            'csrf_protection' => false
        ]);
    }
}
