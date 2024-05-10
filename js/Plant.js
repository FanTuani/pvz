class Plant {
    constructor(plant) {
        this.element = plant;
        this.shootable = plant.cardIdx < 3;
        this.boomable = plant.cardIdx === 5 || plant.cardIdx === 6
        this.sunable = plant.cardIdx === 4
        this.row = plant.row;
        this.column = plant.column;
        this.blood = (plant.cardIdx === 3) ? 200 : 30;
        if (this.shootable) {
            this.shootInv = setInterval(() => {
                this.shoot();
            }, 1000);
        }
        if (this.boomable) {
            setTimeout(() => {
                this.boom()
            }, 500)
        }
        if (this.sunable) {
            this.sunInv = setInterval(() => {
                this.spawnSun()
            }, 2000)
        }
    }

    spawnSun() {
        let sun = document.createElement('img')
        sun.src = 'images/Sun.gif'
        sun.style.position = 'absolute'
        sun.style.top = this.element.offsetTop + 'px'
        sun.style.left = this.element.offsetLeft + 'px'
        container.appendChild(sun)
        let sunMoveInv = setInterval(() => {
            sun.style.top = sun.offsetTop - 2 + 'px'
            if (sun.offsetTop <= 0) {
                clearInterval(sunMoveInv)
                container.removeChild(sun)
            }
        }, 5)
    }

    boom() {
        if (this.element.src.includes('Jalapeno')) {
            let flame = document.createElement('img')
            flame.style.position = 'absolute'
            flame.src = 'images/JalapenoAttack.gif?' + Math.random()
            flame.style.top = this.element.offsetTop - 50 + 'px'
            flame.style.left = 150 + 'px'
            container.appendChild(flame)
            setTimeout(() => {
                container.removeChild(flame)
            }, 1500)
            for (let zombie of zombies) {
                if (zombie.row === this.row) {
                    zombie.damage(zombie.blood)
                }
            }
        } else if (this.element.src.includes('CherryBomb')) {
            let boomText = document.createElement('p')
            boomText.textContent = 'BOOM'
            boomText.style.position = 'absolute'
            boomText.style.top = this.element.offsetTop - 70 + 'px'
            boomText.style.left = this.element.offsetLeft - 65 + 'px'
            boomText.style.fontSize = '70px'
            boomText.classList.add('damageTextRed')
            container.appendChild(boomText)
            setTimeout(() => {
                container.removeChild(boomText)
            }, 1000)
            for (let zombie of zombies) {
                if (Math.abs(zombie.row - this.row) < 2 &&
                    Math.abs(zombie.element.offsetLeft + 50 - this.element.offsetLeft) < 150) {
                    zombie.damage(zombie.blood)
                }
            }
        }
        this.die()
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
        damageText.classList.add('damageTextGreen')
        container.appendChild(damageText)
        setTimeout(() => {
            container.removeChild(damageText)
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
        if (this.sunInv) clearInterval(this.sunInv)
        container.removeChild(this.element)
    }
}

