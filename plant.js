class Plant {
    constructor(plant) {
        this.element = plant;
        this.shootable = plant.cardIdx < 3;
        this.row = plant.row;
        this.blood = (plant.cardIdx === 3) ? 2000 : 400;
        if (this.shootable) {
            setInterval(() => {
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
    }
}

