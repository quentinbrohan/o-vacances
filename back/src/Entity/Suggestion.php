<?php

namespace App\Entity;

use App\Repository\SuggestionRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=SuggestionRepository::class)
 */
class Suggestion
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_trip")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=64)
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_trip")
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_trip")
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="suggestion")
     * @Groups("apiV0_Suggestion")
     * @Groups("apiV0_trip")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Trip::class, inversedBy="suggestion")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("apiV0_Suggestion")
     */
    private $trip;

    /**
     * @ORM\Column(type="datetime")
     * @Groups("apiV0_trip")
     * @Groups("apiV0_Suggestion")
     */
    private $createdAt;

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

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
