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

function createPeashooter(onclick) {
    let peashooter = document.createElement('img')
    peashooter.src = 'images/Peashooter.gif'
    peashooter.style.position = 'absolute'


    // cancel right click menu
    document.oncontextmenu = function (event) {
        event.preventDefault()
    }
    // mouse follow
    document.onmousemove = function (event) {
        peashooter.style.top = event.y - 35 + 'px'
        peashooter.style.left = event.x - 30 + 'px'
    }
    // plant
    document.onmousedown = function (event) {
        document.onmousedown = null
        document.onmousemove = null

        if (event.button === 0) {
            let top = peashooter.offsetTop - 45
            peashooter.route = parseInt(top / 100) // emm
            if (peashooter.route < 0 || peashooter.route > 4) {
                container.removeChild(peashooter)
                return
            }
            peashooter.style.top = (peashooter.route + 1) * 100 + 'px' // emm
            onclick(peashooter)
        } else if (event.button === 2) {
            container.removeChild(peashooter)
        }
    }

    container.appendChild(peashooter)
    return peashooter
}

function createBullet(peashooter, code, disappear) {
    let bullet = document.createElement('img')
    bullet.src = 'images/Bullet.gif'
    bullet.style.position = 'absolute'
    bullet.route = peashooter.route
    bullet.code = new Date().getTime() + 'bullet' + code

    bullet.style.left = peashooter.offsetLeft + 35 + 'px'
    bullet.style.top = peashooter.offsetTop + 'px'

    bullet.step = () => {
        if (bullet.src.endsWith('Bullet.gif') && bullet.offsetLeft < 950) {
            bullet.style.left = bullet.offsetLeft + 3 + 'px'
        } else {
            disappear(bullet)
        }
    }

    bullets.push(bullet)

    container.appendChild(bullet)
    return bullet
}

function createHead(zombie) {
    let head = document.createElement('img')
    head.src = 'images/ZombieHead.gif'
    head.style.position = 'absolute'

    head.style.left = zombie.offsetLeft + 'px'
    head.style.top = zombie.offsetTop + 'px'

    container.appendChild(head)
    return head
}