<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ActivityRepository::class)
 */
class Activity
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
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="activity")
     * @Groups("apiV0_list")
     */
    private $creator;

    /**
     * @ORM\ManyToOne(targetEntity=Category::class, inversedBy="activities")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("apiV0_list")
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity=Trip::class, inversedBy="activities")
     * @ORM\JoinColumn(nullable=false)
     * @Groups("apiV0_list")
     */
    private $trip;

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

    public function getCreator(): ?User
    {
        return $this->creator;
    }

    public function setCreator(?User $creator): self
    {
        $this->creator = $creator;

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

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
