<?php

namespace App\Entity;

use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TripRepository::class)
 */
class Trip
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("apiV0_list")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * @Groups("apiV0_list")
     */
    private $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("apiV0_list")
     */
    private $description;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_list")
     */
    private $start_date;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_list")
     */
    private $end_date;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups("apiV0_list")
     */
    private $location;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     * @Groups("apiV0_list")
     */
    private $picture;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="trip")
     * @Groups("apiV0_list")
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="trip")
     * @Groups("apiV0_list")
     */
    private $activities;

    /**
     * @ORM\OneToMany(targetEntity=Disponibility::class, mappedBy="trip")
     * @Groups("apiV0_list")
     */
    private $disponibility;

    /**
     * @ORM\OneToMany(targetEntity=Suggestion::class, mappedBy="trip")
     * @Groups("apiV0_list")
     */
    private $suggestion;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("apiV0_list")
     */
    private $Creator;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->activities = new ArrayCollection();
        $this->disponibility = new ArrayCollection();
        $this->suggestion = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->start_date;
    }

    public function setStartDate(?\DateTimeInterface $start_date): self
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->end_date;
    }

    public function setEndDate(?\DateTimeInterface $end_date): self
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getPicture(): ?string
    {
        return $this->picture;
    }

    public function setPicture(?string $picture): self
    {
        $this->picture = $picture;

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
            $user->addTrip($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            $user->removeTrip($this);
        }

        return $this;
    }

    /**
     * @return Collection|Activity[]
     */
    public function getActivities(): Collection
    {
        return $this->activities;
    }

    public function addActivity(Activity $activity): self
    {
        if (!$this->activities->contains($activity)) {
            $this->activities[] = $activity;
            $activity->setTrip($this);
        }

        return $this;
    }

    public function removeActivity(Activity $activity): self
    {
        if ($this->activities->contains($activity)) {
            $this->activities->removeElement($activity);
            // set the owning side to null (unless already changed)
            if ($activity->getTrip() === $this) {
                $activity->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Disponibility[]
     */
    public function getDisponibility(): Collection
    {
        return $this->disponibility;
    }

    public function addDisponibility(Disponibility $disponibility): self
    {
        if (!$this->disponibility->contains($disponibility)) {
            $this->disponibility[] = $disponibility;
            $disponibility->setTrip($this);
        }

        return $this;
    }

    public function removeDisponibility(Disponibility $disponibility): self
    {
        if ($this->disponibility->contains($disponibility)) {
            $this->disponibility->removeElement($disponibility);
            // set the owning side to null (unless already changed)
            if ($disponibility->getTrip() === $this) {
                $disponibility->setTrip(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Suggestion[]
     */
    public function getSuggestion(): Collection
    {
        return $this->suggestion;
    }

    public function addSuggestion(Suggestion $suggestion): self
    {
        if (!$this->suggestion->contains($suggestion)) {
            $this->suggestion[] = $suggestion;
            $suggestion->setTrip($this);
        }

        return $this;
    }

    public function removeSuggestion(Suggestion $suggestion): self
    {
        if ($this->suggestion->contains($suggestion)) {
            $this->suggestion->removeElement($suggestion);
            // set the owning side to null (unless already changed)
            if ($suggestion->getTrip() === $this) {
                $suggestion->setTrip(null);
            }
        }

        return $this;
    }

    public function getCreator(): ?string
    {
        return $this->Creator;
    }

    public function setCreator(string $Creator): self
    {
        $this->Creator = $Creator;

        return $this;
    }
}
