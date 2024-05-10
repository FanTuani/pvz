// let container = document.getElementById('container')
//
// function createZombie(id, gameover) {
//     let zombie = document.createElement('img')
//     zombie.src = 'images/Zombie.gif'
//     zombie.blood = 9
//     zombie.speed = 2
//
//     zombie.status = parseInt(Math.random() * 6)
//     zombie.id = id
//     if (zombie.status < 3) {
//         zombie.src = 'images/Zombie.gif'
//         zombie.blood = 9
//     } else if (zombie.status === 5) {
//         zombie.src = 'images/BucketheadZombie.gif'
//         zombie.blood = 49
//     } else {
//         zombie.src = 'images/ConeheadZombie.gif'
//         zombie.blood = 29
//     }
//
//     zombie.style.position = 'absolute'
//
//     zombie.route = parseInt(Math.random() * 5)
//
//     zombie.style.top = 30 + zombie.route * 100 + 'px'
//     zombie.style.left = '800px'
//
//     zombie.count = 0
//     zombie.step = function () {
//         if (zombie.count++ < 10) {
//             return
//         }
//         zombie.count = 0
//         if (zombie.src.endsWith('Zombie.gif') && zombie.offsetLeft > -200) {
//             zombie.style.left = zombie.offsetLeft - zombie.speed + 'px'
//         }
//         if (zombie.offsetLeft < -150) {
//             gameover()
//         }
//     }
//
//     container.appendChild(zombie)
//     return zombie
// }
//
// function createPeashooter(type, onclick) {
//     let peashooter = document.createElement('img')
//     switch (type) {
//         case 1: {
//             peashooter.src = 'images/Peashooter.gif'
//             peashooter.blood = 400
//             break
//         }
//         case 2: {
//             peashooter.src = 'images/SnowPea.gif'
//             peashooter.blood = 400
//             break
//         }
//         case 3: {
//             peashooter.src = 'images/Repeater.gif'
//             peashooter.blood = 400
//             break
//         }
//         case 4: {
//             peashooter.src = 'images/TallNut.gif'
//             peashooter.blood = 2000
//             break
//         }
//     }
//
//     peashooter.style.position = 'absolute'
//     peashooter.type = type
//     peashooter.attack = []
//     shooters.push(peashooter)
//
//     // let card = document.getElementsByClassName('card')
//     // card.style.opacity = 0.7
//
//     // cancel right click menu
//     document.oncontextmenu = function (event) {
//         event.preventDefault()
//     }
//     // mouse follow
//     document.onmousemove = function (event) {
//         if (type === 4) {
//             peashooter.style.top = event.y - 80 + 'px'
//             peashooter.style.top = event.y - 80 + 'px'
//             peashooter.style.left = event.x - 30 + 'px'
//         } else {
//             peashooter.style.top = event.y - 35 + 'px'
//             peashooter.style.left = event.x - 30 + 'px'
//         }
//     }
//     // plant
//     document.onmousedown = function (event) {
//         document.onmousedown = null
//         document.onmousemove = null
//
//         // card.style.opacity = 1
//
//         if (event.button === 0) {
//             let top = peashooter.offsetTop - 45
//             peashooter.route = parseInt(top / 100) // emm
//             if (peashooter.route < 0 || peashooter.route > 4) {
//                 container.removeChild(peashooter)
//                 return
//             }
//             if (type === 4) {
//                 peashooter.style.top = (peashooter.route + 1) * 100 - 30 + 'px' // emm
//             } else {
//                 peashooter.style.top = (peashooter.route + 1) * 100 + 'px' // emm
//             }
//             onclick(peashooter)
//         } else if (event.button === 2) {
//             container.removeChild(peashooter)
//         }
//     }
//
//     container.appendChild(peashooter)
//     return peashooter
// }
//
// function createBullet(peashooter, code, disappear) {
//     let bullet = document.createElement('img')
//     switch (peashooter.type) {
//         case 1 : {
//             bullet.src = 'images/Bullet.gif'
//             break
//         }
//         case 2: {
//             bullet.src = 'images/SnowBullet.gif'
//             break
//         }
//         case 3 : {
//             bullet.src = 'images/Bullet.gif'
//             break
//         }
//     }
//     bullet.type = peashooter.type
//
//     bullet.style.position = 'absolute'
//     bullet.route = peashooter.route
//     bullet.code = new Date().getTime() + 'bullet' + code
//
//     bullet.style.left = peashooter.offsetLeft + 35 + 'px'
//     bullet.style.top = peashooter.offsetTop + 'px'
//
//     bullet.step = () => {
//         if (bullet.src.endsWith('Bullet.gif') && bullet.offsetLeft < 950) {
//             bullet.style.left = bullet.offsetLeft + 3 + 'px'
//         } else {
//             disappear(bullet)
//         }
//     }
//
//     bullets.push(bullet)
//
//     container.appendChild(bullet)
//     return bullet
// }
//
// function createHead(zombie) {
//     let head = document.createElement('img')
//     head.src = 'images/ZombieHead.gif'
//     head.style.position = 'absolute'
//
//     head.style.left = zombie.offsetLeft + 'px'
//     head.style.top = zombie.offsetTop + 'px'
//
//     container.appendChild(head)
//     return head
// }