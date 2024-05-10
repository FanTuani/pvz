class Zombie {
    constructor() {
        this.element = document.createElement('img');
        switch (parseInt(Math.random() * 3)) {
            case 0: {
                this.element.src = 'images/Zombie.gif?' + Math.random();
                this.blood = 9;
                break
            }
            case 1: {
                this.element.src = 'images/ConeheadZombie.gif?' + Math.random();
                this.blood = 19;
                break
            }
            case 2: {
                this.element.src = 'images/BucketheadZombie.gif?' + Math.random();
                this.blood = 29;
                break
            }
        }
        this.element.style.position = 'absolute';
        this.row = parseInt(Math.random() * 5);
        this.element.style.top = 30 + this.row * 100 + 'px';
        this.element.style.left = '800px';

        this.speed = 5;

        this.moveInterval = setInterval(() => {
            this.step();
        }, 1000 / 7);
        container.appendChild(this.element);
    }

    step() {
        let shouldEat = false, eatPlant = null
        for (let plant of plants) {
            if (plant.row !== this.row) continue
            if (plant.element.offsetLeft < this.element.offsetLeft + 30 ||
                plant.element.offsetLeft > this.element.offsetLeft + 120) continue;
            eatPlant = plant
        }
        if (eatPlant) {
            eatPlant.damage(1)
            if (this.element.src.includes('Zombie.gif')) {
                if (this.element.src.includes('Cone')) {
                    this.element.src = 'images/ConeheadZombieAttack.gif?' + Math.random()
                } else if (this.element.src.includes('Bucket')) {
                    this.element.src = 'images/BucketheadZombieAttack.gif?' + Math.random()
                } else {
                    this.element.src = 'images/ZombieAttack.gif?' + Math.random()
                }
            }
        } else {
            if (this.element.src.includes('ZombieAttack.gif')) {
                if (this.element.src.includes('Cone')) {
                    this.element.src = 'images/ConeheadZombie.gif?' + Math.random()
                } else if (this.element.src.includes('Bucket')) {
                    this.element.src = 'images/BucketheadZombie.gif?' + Math.random()
                } else {
                    this.element.src = 'images/Zombie.gif?' + Math.random()
                }
            }
            this.element.style.left = this.element.offsetLeft - this.speed + 'px';
        }
    }

    damage(damage) {
        this.blood -= damage;
        this.element.classList.add('damageEff')
        setTimeout(() => {
            this.element.classList.remove('damageEff')
        }, 100)

        if (this.blood <= 0) {
            this.die();
        }

        let damageText = document.createElement('p');
        damageText.style.position = 'absolute'
        damageText.textContent = this.blood.toString()
        damageText.style.top = this.element.offsetTop + 'px';
        damageText.style.left = this.element.offsetLeft + 80 + 'px';
        damageText.classList.add('damageTextRed')
        container.appendChild(damageText)
        setTimeout(() => {
            container.removeChild(damageText)
        }, 1000);
    }

    die() {
        clearInterval(this.moveInterval)
        zombies = zombies.filter(item => item !== this)
        this.element.src = 'images/ZombieDie.gif?' + Math.random();
        new Head(this)
        setTimeout(() => {
            container.removeChild(this.element);
        }, 2000);
        killedZombies++
    }
}

class Head {
    constructor(zombie) {
        this.element = document.createElement('img');
        this.element.src = 'images/ZombieHead.gif?' + Math.random();
        this.element.style.position = 'absolute';
        this.element.style.top = zombie.element.offsetTop + 'px';
        this.element.style.left = zombie.element.offsetLeft + 'px';
        container.appendChild(this.element);
        setTimeout(() => {
            container.removeChild(this.element);
        }, 1500);
    }
}

function startSpawnZombies(num, inv) {
    let cnt = 0;
    let intervalId = setInterval(() => {
        zombies.push(new Zombie());
        if (++cnt >= num) clearInterval(intervalId);
    }, inv);
}
