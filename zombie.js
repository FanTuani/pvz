function startSpawnZombies(num) {
    let cnt = 0
    let intervalId = setInterval(function () {
        zombies.push(spawnZombie())
        if (++cnt >= num) clearInterval(intervalId)
    }, 1000)
}

function spawnZombie() {
    let zombie = document.createElement('img')
    zombie.src = 'images/Zombie.gif'
    zombie.style.position = 'absolute'

    zombie.row = parseInt(Math.random() * 5)
    zombie.speed = 2
    zombie.style.top = 30 + zombie.row * 100 + 'px'
    zombie.style.left = '800px'

    zombie.step = function () {
        zombie.style.left = zombie.offsetLeft - zombie.speed + 'px'
    }

    container.appendChild(zombie)
    return zombie
}