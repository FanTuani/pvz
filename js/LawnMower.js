class LawnMower {
    constructor(row) {
        this.row = row
        this.element = document.createElement('img')
        this.element.src = 'images/LawnMower.gif'
        this.element.style.position = 'absolute'
        this.element.style.top = 110 + row * 100 + 'px'
        this.element.style.left = 100 + 'px'
        container.appendChild(this.element)
        this.checkInv = setInterval(() => {
            this.checkZombies()
        }, 500)
    }

    checkZombies() {
        let go = false
        for (let zombie of zombies) {
            if (zombie.element.offsetLeft < 100) {
                go = true
                break
            }
        }
        if (!go) return

        clearInterval(this.checkInv)
        this.stepInv = setInterval(() => {
            this.step()
        }, 5)
    }

    step() {
        this.element.style.left = this.element.offsetLeft + 2 + 'px'
        if (this.element.offsetLeft > 900) {
            clearInterval(this.stepInv)
            container.removeChild(this.element)
        }
        for (let zombie of zombies) {
            if (this.row !== zombie.row) continue;
            if (this.element.offsetLeft < zombie.element.offsetLeft + 30 ||
                this.element.offsetLeft > zombie.element.offsetLeft + 120) continue;
            zombie.damage(zombie.blood);
        }
    }
}