class Zombie {
    constructor() {
        this.element = document.createElement('img');
        this.element.src = 'images/Zombie.gif';
        this.element.style.position = 'absolute';
        this.row = parseInt(Math.random() * 5);
        this.speed = 2;
        this.blood = 9;
        this.element.style.top = 30 + this.row * 100 + 'px';
        this.element.style.left = '800px';
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
        zombies = zombies.filter(item => item !== this)
        this.element.src = 'images/ZombieDie.gif';
        let head = document.createElement('img');
        head.src = 'images/ZombieHead.gif';
        head.style.position = 'absolute';
        head.style.top = this.element.offsetTop + 'px';
        head.style.left = this.element.offsetLeft + 'px';
        container.appendChild(head);
        setTimeout(() => {
            container.removeChild(this.element);
            container.removeChild(head);
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
