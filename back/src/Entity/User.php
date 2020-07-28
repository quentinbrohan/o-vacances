<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Entity\Suggestion;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0_list")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_user")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_activity")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups("apiV0_list")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_user")
     * @Groups("apiV0_activity")
     * @Groups("apiV0_Suggestion")
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups("apiV0_list")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_user")
     * @Groups("apiV0_activity")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * 
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_activity")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_list")
     * @Groups("apiV0_user")
     * @Groups("apiV0_Suggestion")
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=128)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0_dispoByUser")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_list")
     * @Groups("apiV0_user")
     * @Groups("apiV0_activity")
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=128, nullable=true)
     * @Groups("apiV0_trip")
     * @Groups("apiV0_dispoByTrip")
     * @Groups("apiV0-dispo")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_user")
     * @Groups("apiV0_list")
     * @Groups("apiV0_activity")
     * @Groups("apiV0_Suggestion")
     */
    private $avatar;

    /**
     * @ORM\OneToMany(targetEntity=Suggestion::class, mappedBy="user")
     * 
     */
    private $suggestions;

    /**
     * @ORM\ManyToMany(targetEntity=Disponibility::class, inversedBy="users")
     * @Groups("apiV0_dispoByUser")
     * 
     */
    private $disponibility;

    /**
     * @ORM\ManyToMany(targetEntity=Trip::class, inversedBy="users")
     * @Groups("apiV0_tripByUser")
     * @Groups("apiV0_user")
     * @Groups("apiV0_list")
     */
    private $trip;

    /**
     * @ORM\OneToMany(targetEntity=Activity::class, mappedBy="creator")
     * 
     */
    private $activity;

    /**
     * @ORM\OneToMany(targetEntity=Trip::class, mappedBy="creator")
     */
    private $trips;
    
    public function __construct()
    {
        $this->suggestions = new ArrayCollection();
        $this->trip = new ArrayCollection();
        $this->activity = new ArrayCollection();
        $this->disponibility = new ArrayCollection();
        $this->trips = new ArrayCollection();
    }

   public function __toString()
    {
        return $this->getEmail();
    }
   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;

        return $this;
    }
    /**
     * @return Collection|Suggestion[]
     */
    public function getSuggestions(): Collection
    {
        return $this->suggestions;
    }
    public function addSuggestions(Suggestion $suggestion): self
    {
        if (!$this->suggestion->contains($suggestion)) {
            $this->addSuggestions[] = $suggestion;
            $suggestion->setUser($this);
        }
        return $this;
    }
    public function removeSuggestion(Suggestion $suggestion): self
    {
        if ($this->suggestions->contains($suggestion)) {
            $this->suggestions->removeElement($suggestion);
            // set the owning side to null (unless already changed)
            if ($suggestion->getUser() === $this) {
                $suggestion->setUser(null);
            }
        }
        return $this;
    }
    /**
     * @return Collection|Suggestion[]
     */
    public function getDisponibility(): Collection
    {
        return $this->disponibility;
    }
    public function addDisponibility(Disponibility $disponibility): self
    {
        if (!$this->disponibility->contains($disponibility)) {
            $this->disponibility[] = $disponibility;
            $disponibility->addUser($this);
        }
        return $this;
    }
    public function removeDisponibility(Disponibility $disponibility): self
    {
        if ($this->disponibility->contains($disponibility)) {
            $this->disponibility->removeElement($disponibility);
            // set the owning side to null (unless already changed)
            if ($disponibility->getUsers() === $this) {
                $disponibility->addUser(null);
            }
        }
        return $this;
    }
    /**
     * @return Collection|Trip[]
     */
    public function getTrip(): Collection
    {
        return $this->trip;
    }
    public function addTrip(Trip $trip): self
    {
        if (!$this->trip->contains($trip)) {
            $this->trip[] = $trip;
        }
        return $this;
    }
    public function removeTrip(Trip $trip): self
    {
        if ($this->trip->contains($trip)) {
            $this->trip->removeElement($trip);
            if ($trip->getUsers() === $this) {
                $trip->addUsers(null);
            }
        }
        return $this;
    }
    /**
     * @return Collection|Activity[]
     */
    public function getActivity(): Collection
    {
        return $this->activity;
    }
    public function addActivity(Activity $activity): self
    {
        if (!$this->activity->contains($activity)) {
            $this->activity[] = $activity;
            $activity->setCreator($this);
        }
        return $this;
    }
    public function removeActivity(Activity $activity): self
    {
        if ($this->activity->contains($activity)) {
            $this->activity->removeElement($activity);
            // set the owning side to null (unless already changed)
            if ($activity->getCreator() === $this) {
                $activity->setCreator(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection|Trip[]
     */
    public function getTrips(): Collection
    {
        return $this->trips;
    }
}
