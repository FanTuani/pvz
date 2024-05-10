class Zombie {
    constructor() {
        this.element = document.createElement('img');
        this.element.src = 'images/Zombie.gif?' + Math.random();
        this.element.style.position = 'absolute';
        this.row = parseInt(Math.random() * 5);
        this.element.style.top = 30 + this.row * 100 + 'px';
        this.element.style.left = '800px';

        this.speed = 2;
        this.blood = 9;

        this.moveInterval = setInterval(() => {
            this.step();
        }, 1000 / 7);
        container.appendChild(this.element);
    }

    step() {
        this.element.style.left = this.element.offsetLeft - this.speed + 'px';
    }

    damage(damage) {
        this.blood -= damage;
        if (this.blood <= 0) {
            this.die();
        }
    }

    die() {
        clearInterval(this.moveInterval)
        zombies = zombies.filter(item => item !== this)
        this.element.src = 'images/ZombieDie.gif?' + Math.random();
        new Head(this)
        setTimeout(() => {
            container.removeChild(this.element);
        }, 2000);
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

function startSpawnZombies(num) {
    let cnt = 0;
    let intervalId = setInterval(() => {
        zombies.push(new Zombie());
        if (++cnt >= num) clearInterval(intervalId);
    }, 1000);
}
