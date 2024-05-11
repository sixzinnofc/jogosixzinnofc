document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.getElementById("gameArea");
    const player = document.getElementById("player");
    const bullet = document.getElementById("bullet");

    let bulletInterval;
    let enemies = [];

    // Move o jogador para a esquerda
    function moveLeft() {
        const playerRect = player.getBoundingClientRect();
        if (playerRect.left > 0) {
            player.style.left = playerRect.left - 10 + "px";
        }
    }

    // Move o jogador para a direita
    function moveRight() {
        const playerRect = player.getBoundingClientRect();
        if (playerRect.right < gameArea.offsetWidth) {
            player.style.left = playerRect.left + 10 + "px";
        }
    }

    // Dispara um tiro
    function fireBullet() {
        bullet.style.display = "block";
        const playerRect = player.getBoundingClientRect();
        bullet.style.left = playerRect.left + playerRect.width / 2 - bullet.offsetWidth / 2 + "px";
        bulletInterval = setInterval(moveBullet, 10);
    }

    // Move o tiro para cima
    function moveBullet() {
        const bulletRect = bullet.getBoundingClientRect();
        if (bulletRect.top > 0) {
            bullet.style.top = bulletRect.top - 10 + "px";
            checkCollision();
        } else {
            clearInterval(bulletInterval);
            bullet.style.display = "none";
        }
    }

    // Cria um inimigo
    function createEnemy() {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
        gameArea.appendChild(enemy);
        moveEnemy(enemy);
    }

    // Move o inimigo para baixo
    function moveEnemy(enemy) {
        const enemyInterval = setInterval(function() {
            const enemyRect = enemy.getBoundingClientRect();
            if (enemyRect.bottom < gameArea.offsetHeight) {
                enemy.style.top = enemyRect.top + 10 + "px";
                checkCollision(enemy);
            } else {
                clearInterval(enemyInterval);
                gameArea.removeChild(enemy);
            }
        }, 500);
    }

    // Verifica colisão entre o tiro e os inimigos
    function checkCollision(enemy) {
        const bulletRect = bullet.getBoundingClientRect();
        if (enemy) {
            const enemyRect = enemy.getBoundingClientRect();
            if (bulletRect.left < enemyRect.right &&
                bulletRect.right > enemyRect.left &&
                bulletRect.top < enemyRect.bottom &&
                bulletRect.bottom > enemyRect.top) {
                clearInterval(bulletInterval);
                bullet.style.display = "none";
                gameArea.removeChild(enemy);
            }
        }
    }

    // Event listeners para movimento do jogador e tiro
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowLeft") {
            moveLeft();
        } else if (event.key === "ArrowRight") {
            moveRight();
        } else if (event.key === " ") {
            fireBullet();
        }
    });

    // Cria novos inimigos a cada 1 segundo
    setInterval(createEnemy, 1000);
});
