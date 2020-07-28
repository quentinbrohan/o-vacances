<?php

namespace App\Entity;

use App\Repository\TripRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TripRepository::class)
 */
class Trip
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_list")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_activity")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0-dispo")
     * @Assert\NotBlank
     * @Assert\Length(max=64)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_list")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_user")
     * @Groups("apiV0_activity")
     */
    private $title;

    
    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups("apiV0_list")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_activity")
     *
     */
    private $description;

    /**  
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_activity")
     */
    private $startDate;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_activity")
     */
    private $endDate;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(max=255)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_activity")
     */
    private $location;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     * @Assert\Length(max=128)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_activity")
     */
    private $image;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, mappedBy="trip")
     * @Groups("apiV0_trip")
     * 
     */
    private $users;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="trip", cascade={"remove"})
     * @Groups("apiV0_trip")
     */
    private $activities;

    /**
     * @ORM\OneToMany(targetEntity=Disponibility::class, mappedBy="trip", cascade={"remove"})
     * @Groups("apiV0_trip")
     * @Groups("apiV0_dispoByTrip")
     */
    private $disponibility;

    /**
     * @ORM\OneToMany(targetEntity=Suggestion::class, mappedBy="trip", cascade={"remove"})
     * @Groups("apiV0_trip")
     */
    private $suggestion;
    
    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="trips")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("apiV0_trip")
     * 
     */
    private $creator;

    /**
     * @ORM\Column(type="string", length=64, nullable=true)
     * @Groups("apiV0_trip")
     */
    private $password;


    

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->activities = new ArrayCollection();
        $this->disponibility = new ArrayCollection();
        $this->suggestion = new ArrayCollection();
    }

    // /**
    //  * @Groups("apiV0_trip")
    //  * je créé une fonction custom qui va parcourir mes entites2 et j'en ressort ce que j'en souhaite
    //  * ci dessous un exemple possible mais tu es libre sur le retour 
    //  * Note: groupe n'est pas uniquement applicable sur les propriété ;) 
    //  */
    // public function getUsersDetails(){
    //     $tableauAretourner = [];
            
    //     foreach ($this->users as $user) {
    //         $tableauAretourner[] = $user->getEmail();
    //     };

    //     return implode(',', $tableauAretourner);
    // }

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

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUsers(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
            $user->addTrip($this);
        }

        return $this;
    }

    public function removeUsers(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
            // set the owning side to null (unless already changed)
            if ($user->getTrip() === $this) {
                $user->addTrip(null);
            }
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

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

}
