<?php

namespace App\Entity;

use App\Repository\DisponibilityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=DisponibilityRepository::class)
 */
class Disponibility
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("apiV0_list")
     */
    private $id;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_list")
     */
    private $startDate;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_list")
     */
    private $endDate;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="disponibility")
     * @Groups("apiV0_list")
     */
    private $users;

    /**
     * @ORM\ManyToOne(targetEntity=Trip::class, inversedBy="disponibility")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("apiV0_list")
     */
    private $trip;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(?\DateTimeInterface $startDate): self
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(?\DateTimeInterface $endDate): self
    {
        $this->endDate = $endDate;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    
    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addDisponibility($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getDisponibility() === $this) {
                $user->addDisponibility(null);
            }
        }

        return $this;
    }

    public function getTrip(): ?Trip
    {
        return $this->trip;
    }

    public function setTrip(?Trip $trip): self
    {
        $this->trip = $trip;

        return $this;
    }
}
