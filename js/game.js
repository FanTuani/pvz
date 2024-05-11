function spawnLawnMower() {
    let row = 0
    let inv = setInterval(() => {
        new LawnMower(row++)
        if (row === 5) {
            clearInterval(inv)
        }
    }, 200)
}

function startSpawnZombies(num, inv) {
    let cnt = 0;
    let intervalId = setInterval(() => {
        zombies.push(new Zombie());
        if (++cnt >= num) clearInterval(intervalId);
    }, inv);
}
