<?php
namespace App\Twig\Components;

use Symfony\UX\LiveComponent\Attribute\AsLiveComponent;
use Symfony\UX\LiveComponent\Attribute\LiveProp;
use Symfony\UX\LiveComponent\DefaultActionTrait;



#[AsLiveComponent] 
class GridPixel
{
    use DefaultActionTrait;

    #[LiveProp(writable: true)]
    public string $color;
    #[LiveProp(writable: true)]
    public int $cols;
    #[LiveProp(writable: true)]
    public int $rows;

    public function __construct(string $color = "FFFFFF", int $cols = 8, int $rows = 8)
    {
        $this->color = $color;
        $this->cols = $cols;
        $this->rows = $rows;
    }

    public function getColor(): string
    {
        return $this->color;
    }
    public function getCols(): int
    {
        return $this->cols;
    }
    public function getRows(): int
    {
        return $this->rows;
    }
}