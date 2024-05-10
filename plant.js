function createPlant(plant) {
    if (plant.cardIdx < 3) {
        plant.shootable = true
    }
    if (plant.shootable) {
        setInterval(function () {
            shoot(plant)
        }, 1000)
    }
}

function shoot(plant) {
    let needShoot = false
    for (let zombie of zombies) {
        if (plant.row === zombie.row && plant.offsetLeft < zombie.offsetLeft + 40) needShoot = true
    }
    if (!needShoot) return

    let bullet = document.createElement('img')
    bullet.src = 'images/Bullet.gif'
    bullet.style.position = 'absolute'
    bullet.style.top = plant.offsetTop + 'px'
    bullet.style.left = plant.offsetLeft + 35 + 'px'

    bullet.row = plant.row

    bullet.step = function () {
        bullet.style.left = bullet.offsetLeft + 5 + 'px'

        if (bullet.offsetLeft > 950) {
            bullets = bullets.filter(item => item !== bullet)
            container.removeChild(bullet)
        }

        for (let zombie of zombies) {
            if (bullet.row !== zombie.row) continue
            if (bullet.offsetLeft < zombie.offsetLeft + 30 ||
                bullet.offsetLeft > zombie.offsetLeft + 120) continue

            bullets = bullets.filter(item => item !== bullet)
            bullet.src = 'images/BulletHit.gif'
            setTimeout(function () {
                container.removeChild(bullet)
            }, 50)
            break
        }
    }

    bullets.push(bullet)
    container.appendChild(bullet)
    return bullet
}