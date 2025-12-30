import { Controller } from '@hotwired/stimulus';

const COLORS = ['white', 'red', 'green', 'blue', 'yellow', 'black', 'orange', 'purple'];

/*
 *
 * Any element with a data-controller="pixel" attribute will cause
 */
export default class extends Controller {    
    static targets = ['palette', 'swatch', 'grid']

    connect() {
        console.log('Pixel controller connected');
        // créer une propriété qui va stocker la grille de pixels
        this.pixels = [];
        this.activeColor = localStorage.getItem('activeColor') || COLORS[0];
        // On récupère la grille de pixels depuis le localStorage
        this.initPixels();
        this.initPalette();

    }

    drawColor(event) {
        const cell = event.currentTarget;
        cell.style.backgroundColor = this.activeColor;

        //On met à jour la grille de pixels
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (!this.pixels[row]) {
            this.pixels[row] = [];
        }
        this.pixels[row][col] = cell.style.backgroundColor;
        this.saveInLocalStorage();

    }

    saveInLocalStorage() {
        localStorage.setItem('pixelGrid', JSON.stringify(this.pixels));
    }

    getCellColor(row, col) {
        if (this.pixels[row] && this.pixels[row][col]) {
            return this.pixels[row][col];
        }
        return 'white';
    }

    initPalette() {
        const paletteContainer = this.targets.find('palette');
        COLORS.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-swatch';
            colorDiv.style.backgroundColor = color;
            if (color === this.getActiveColor()) {
                colorDiv.classList.add('color-active');
            }
            colorDiv.addEventListener('click', (event) => this.setActiveColor(color,event.target));
            paletteContainer.appendChild(colorDiv);
        });
    }
    initPixels() {
        const savedPixels = localStorage.getItem('pixelGrid');
        if (savedPixels) {
            this.pixels = JSON.parse(savedPixels);
            // On met à jour l'affichage des cellules
            this.element.querySelectorAll('.pixel-cell').forEach(cell => {
                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
                const color = this.getCellColor(row, col);
                cell.style.backgroundColor = color;
            });
        }
    }

    setActiveColor(color,cell) {
        this.activeColor = color;
        localStorage.setItem('activeColor', this.activeColor);
        // Ajouter une bordure pour indiquer la couleur active
        document.querySelectorAll('.color-active').forEach(swatch => {
            swatch.classList.remove('color-active');
        });
        cell.classList.add('color-active');
    }

    getActiveColor() {
        return this.activeColor || localStorage.getItem('activeColor') || COLORS[0];
    }
}
