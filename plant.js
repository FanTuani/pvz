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
    }

    bullets.push(bullet)
    container.appendChild(bullet)
    return bullet
}