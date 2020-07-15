<?php

namespace App\Form;

use App\Entity\Suggestion;
use App\Entity\Trip;
use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;

class SuggestionType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('user',
            EntityType::class, [
                'class' => User::class,
                'allow_extra_fields' => true,
            ])
            ->add('trip',
            EntityType::class, [
                'class' => Trip::class,
                'allow_extra_fields' => true,
            ])
           
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Suggestion::class,
            'allow_extra_fields' => true,
            'csrf_protection' => false
        ]);
    }
}
