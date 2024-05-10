function drag(cardIdx) {
    // for card
    let cards = document.getElementsByClassName('card')
    let card = null
    for (let c of cards) {
        if (c.src.endsWith(cardSrc[cardIdx] + '.png')) {
            card = c
        }
    }
    card.style.opacity = 0.7

    // for plant
    let plant = document.createElement('img')
    plant.src = cardSrc[cardIdx] + '.gif?' + Math.random()
    plant.cardIdx = cardIdx
    plant.style.position = 'absolute'
    // plant attributions
    plant.blood = 400

    // for mouse event
    let transPlant = document.createElement('img')
    transPlant.src = plant.src
    transPlant.style.position = 'absolute'
    transPlant.style.opacity = 0.5
    container.appendChild(transPlant)
    container.appendChild(plant)
    document.onmousemove = function (e) {
        plant.style.top = e.y - 35 + 'px'
        plant.style.left = e.x - 35 + 'px'

        // grid
        plant.row = transPlant.row = parseInt((plant.offsetTop - 35) / 100)
        if (transPlant.row < 0) transPlant.row = 0
        if (transPlant.row > 4) transPlant.row = 4

        plant.column = transPlant.column = parseInt((plant.offsetLeft + 30) / 80) - 2
        if (transPlant.column < 0) transPlant.column = 0
        if (transPlant.column > 8) transPlant.column = 8

        plant.overlap = false
        for (let pl of plants) {
            if (pl.row === transPlant.row && pl.column === transPlant.column) {
                plant.overlap = true
            }
        }
        if (plant.overlap) {
            transPlant.style.visibility = 'hidden'
        } else {
            transPlant.style.visibility = 'visible'
        }

        transPlant.style.top = 90 + transPlant.row * 100 + 'px'
        transPlant.style.left = 170 + transPlant.column * 80 + 'px'
        if (plant.src.includes('Tall')) {
            transPlant.style.top = transPlant.offsetTop - 30 + 'px'
        }
        if (plant.src.includes('Cherry')) {
            transPlant.style.left = transPlant.offsetLeft - 20 + 'px'
        }
    }

    document.onmousedown = function () {
        document.onmousemove = null
        card.style.opacity = 1

        if (plant.overlap) {
            container.removeChild(plant)
        } else {
            plant.style.top = transPlant.style.top
            plant.style.left = transPlant.style.left
            plants.push(new Plant(plant))
        }

        container.removeChild(transPlant)
        document.onmousedown = null
    }
}