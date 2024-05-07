let container = document.getElementById('container')

function createZombie(id) {
    let zombie = document.createElement('img')
    zombie.src = 'images/Zombie.gif'
    zombie.id = id
    zombie.blood = 9
    zombie.style.position = 'absolute'

    zombie.route = parseInt(Math.random() * 5)

    zombie.style.top = 30 + zombie.route * 100 + 'px'
    zombie.style.left = '800px'

    zombie.count = 0
    zombie.step = function () {
        if (zombie.count++ < 10) {
            return
        }
        zombie.count = 0
        if (zombie.src.endsWith('Zombie.gif') && zombie.offsetLeft > -200) {
            zombie.style.left = zombie.offsetLeft - 2 + 'px'
        }
    }

    container.appendChild(zombie)
    return zombie
}