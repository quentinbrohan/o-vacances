<?php

namespace App\Form;

use App\Entity\Activity;
<<<<<<< HEAD
use App\Entity\Category;
use App\Entity\Trip;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
=======
>>>>>>> eb221b23fe969a860eb462c05fa9961bf9fa3d53
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ActivityType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title')
            ->add('description')
<<<<<<< HEAD
            ->add('startDate')
            ->add('endDate')
            ->add('creator',
            EntityType::class, [
                "class" => Activity::class,
                "required" => false
            ])
            ->add('category',
            EntityType::class, [
                "class" => Category::class
            ])
            ->add('trip',
            EntityType::class, [
                "class" => Trip::class
            ])
           
=======
            ->add('start_date')
            ->add('end_date')
            ->add('creator')
            ->add('category')
            ->add('trip')
>>>>>>> eb221b23fe969a860eb462c05fa9961bf9fa3d53
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Activity::class,
        ]);
    }
}
