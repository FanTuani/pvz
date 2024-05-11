class Bullet {
    constructor(shooter) {
        this.shooter = shooter
        this.element = document.createElement('img');
        this.element.src = 'images/Bullet.gif';
        if (this.shooter.element.src.includes('SnowPea.gif')) {
            this.element.src = 'images/SnowBullet.gif';
        }
        this.element.style.position = 'absolute';
        this.element.style.top = shooter.element.offsetTop + 'px';
        this.element.style.left = shooter.element.offsetLeft + 35 + 'px';
        this.row = shooter.row;
        this.fire = false

        this.moveInterval = setInterval(() => {
            this.step();
        }, 10);
        container.appendChild(this.element)
    }

    step() { // 100/s
        this.element.style.left = (this.element.offsetLeft + 5) + 'px';

        if (this.element.offsetLeft > 950) {
            this.destroy();
            return;
        }

        for (let plant of plants) {
            if (!plant.element.src.includes('Torch')) continue
            if (this.row !== plant.row) continue
            if (this.element.offsetLeft < plant.element.offsetLeft + 30 ||
                this.element.offsetLeft > plant.element.offsetLeft + 60) continue

            this.fire = true
            this.element.src = 'images/FireBullet.gif?' + Math.random()
        }

        for (let zombie of zombies) {
            if (this.row !== zombie.row) continue
            if (this.element.offsetLeft < zombie.element.offsetLeft + 30 ||
                this.element.offsetLeft > zombie.element.offsetLeft + 120) continue

            this.destroy();
            zombie.damage(this.fire ? 2 : 1);
            if (this.shooter.element.src.includes('SnowPea.gif') && !this.fire) {
                zombie.speed = 1
            }
            break
        }
    }

    destroy() {
        clearInterval(this.moveInterval);
        bullets = bullets.filter(item => item !== this);
        if (this.element.src.includes('FireBullet')) {
            this.element.src = 'images/SputteringFire.gif'
        } else {
            this.element.src = 'images/BulletHit.gif';
        }
        setTimeout(() => {
            container.removeChild(this.element);
        }, 100);
    }
}