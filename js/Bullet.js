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

        for (let zombie of zombies) {
            if (this.row !== zombie.row) continue;
            if (this.element.offsetLeft < zombie.element.offsetLeft + 30 ||
                this.element.offsetLeft > zombie.element.offsetLeft + 120) continue;

            this.destroy();
            zombie.damage(1);
            if (this.shooter.element.src.includes('SnowPea.gif')) {
                zombie.speed = 1
            }
            break;
        }
    }

    destroy() {
        clearInterval(this.moveInterval);
        bullets = bullets.filter(item => item !== this);
        this.element.src = 'images/BulletHit.gif';
        setTimeout(() => {
            container.removeChild(this.element);
        }, 100);
    }
}