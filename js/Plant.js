class Plant {
    constructor(plant) {
        this.element = plant;
        this.shootable = plant.cardIdx < 3;
        this.row = plant.row;
        this.column = plant.column;
        this.blood = (plant.cardIdx === 3) ? 200 : 30;
        if (this.shootable) {
            this.shootInv = setInterval(() => {
                this.shoot();
            }, 1000);
        }
    }

    shoot() {
        let needShoot = false;
        for (let zombie of zombies) {
            if (this.row === zombie.row && this.element.offsetLeft < zombie.element.offsetLeft + 40) {
                needShoot = true;
                break;
            }
        }
        if (!needShoot) return;

        new Bullet(this)
        if (this.element.src.includes('Repeater.gif')) {
            setTimeout(() => {
                new Bullet(this)
            }, 120)
        }
    }

    damage(damage) {
        this.blood -= damage;
        if (this.blood <= 0) {
            this.die();
        }

        let damageText = document.createElement('p');
        damageText.style.position = 'absolute'
        damageText.textContent = this.blood.toString()
        damageText.style.top = this.element.offsetTop - 30 + 'px';
        damageText.style.left = this.element.offsetLeft + 25 + 'px';
        damageText.style.opacity = 1; // 设置为可见
        damageText.classList.add('damageTextGreen')
        container.appendChild(damageText)
        setTimeout(() => {
            damageText.style.opacity = 0; // 一段时间后再将其设置为不可见
        }, 1000);
        if (this.element.src.includes('Tall')) {
            if (this.blood > 60 && this.blood < 120 && !this.element.src.includes('Cracked1')) {
                this.element.src = 'images/TallnutCracked1.gif'
            }
            if (this.blood < 60 && !this.element.src.includes('Cracked2')) {
                this.element.src = 'images/TallnutCracked2.gif'
            }
        }
    }

    die() {
        plants = plants.filter(item => item !== this)
        if (this.shootInv) clearInterval(this.shootInv)
        container.removeChild(this.element)
    }
}
