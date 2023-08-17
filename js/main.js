class Game {
  constructor() {
    this.archerArr = [];
    this.enemyArr = [];
    this.arrowsArr = [];
    this.boardWidth = 0;
    this.boardHeigth = 0;
    this.gameZoneWidth = 662;
    this.gameZomeHeigth = 441;
    this.reinforcementsTimer = 10;
    this.archersAvailable = 1;
    this.score = 0;
    this.start();
  }

  start() {
    this.updateUI();
    this.launchScoring();
    this.getArcherPosition();
    this.initEasyRush();
    this.initMediumRush();
    this.initHardRush();
    this.initEndRush();
    this.startReinforcementsTimer();
  }

  startMusic() {
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.play();
    backgroundMusic.volume = 0.1;
  }

  updateUI() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = this.reinforcementsTimer;

    const archerCounterElement = document.getElementById("archer-counter");
    archerCounterElement.textContent = this.archersAvailable;

    const scoreCounterElement = document.getElementById("score-counter");
    scoreCounterElement.textContent = this.score;
  }

  startReinforcementsTimer() {
    const timerInterval = setInterval(() => {
      this.reinforcementsTimer--;

      if (this.reinforcementsTimer <= 0) {
        this.reinforcementsTimer = 10; // Reset chrono
        this.archersAvailable += 1; // Get one archer
        this.updateUI();
      }

      this.updateUI();
    }, 1000);
  }

  initEasyRush() {
    const easyRush = setInterval(() => {
      const newEnemy = new Enemy();
      this.enemyArr.push(newEnemy);
    }, 4 * 1000);

    setTimeout(() => {
      clearInterval(easyRush);
    }, 45 * 1000);

    setInterval(() => {
      //move all enemies
      this.enemyArr.forEach((enemyInstance) => {
        enemyInstance.moveEnemy();
      });

      // set archers state (shooting or not)
      this.setArchersState();
    }, 100);
  }

  initMediumRush() {
    setTimeout(() => {
      const mediumRush = setInterval(() => {
        for (const enemy of this.enemyArr) {
          enemy.runSpeed = 8;
        }
        const newEnemy = new Enemy();
        this.enemyArr.push(newEnemy);
        setTimeout(() => {
          clearInterval(mediumRush);
        }, 45 * 1000);
      }, 1.5 * 1000);
    }, 45 * 1000);
  }

  initHardRush() {
    setTimeout(() => {
      const hardRush = setInterval(() => {
        for (const enemy of this.enemyArr) {
          enemy.runSpeed = 12;
        }
        const newEnemy = new Enemy();
        this.enemyArr.push(newEnemy);
        setTimeout(() => {
          clearInterval(mediumRush);
        }, 90 * 1000);
      }, 0.75 * 1000);
    }, 90 * 1000);
  }

  initEndRush() {
    setTimeout(() => {
      const endRush = setInterval(() => {
        for (const enemy of this.enemyArr) {
          enemy.runSpeed = 20;
        }
        const newEnemy = new Enemy();
        this.enemyArr.push(newEnemy);
      }, 0.5 * 1000);
    }, 135 * 1000);
  }

  getArcherPosition() {
    const clickZone = document.getElementById("game-zone");

    clickZone.addEventListener("click", function (click) {
      const clickPositionX = click.offsetX;
      const clickPositionY = click.offsetY;

      const column = Math.floor(
        clickPositionX / (preGame.game.gameZoneWidth / 9)
      );
      const row = Math.floor(
        clickPositionY / (preGame.game.gameZomeHeigth / 5)
      );

      const columnName = String.fromCharCode(65 + column); // Convert column to letter (A, B, C, ...)
      const rowNumber = row + 1; // Add 1 to convert row to number (1, 2, 3, ...)

      const cellName = columnName + rowNumber;

      if (preGame.game.archersAvailable > 0) {
        preGame.game.archersAvailable--;
        const newArcher = new Archer(cellName);
        preGame.game.archerArr.push(newArcher);
      }

      preGame.game.startMusic();
      click.stopPropagation();
    });
  }

  setArchersState() {
    this.archerArr.forEach((archer) => {
      const eligibleTargets = this.enemyArr.filter((enemy) => {
        return (
          archer.positionY === enemy.positionY &&
          archer.positionX < enemy.positionX &&
          enemy.positionX <= preGame.game.gameZoneWidth
        );
      });

      if (eligibleTargets.length > 0) {
        archer.takeAim();
      } else {
        archer.atEase();
      }
    });
  }

  launchScoring() {
    setInterval(() => {
      this.score += 10;
      this.updateUI();
    }, 100);
  }

  callForScore() {
    this.finalScore = this.score;
    localStorage.setItem("finalScore", this.finalScore); // I've found this online, no idea of how it works to be honest...
  }
}

class Archer {
  constructor(cellName) {
    this.width = 70;
    this.height = 73;
    this.domElement = null;
    this.defineArcherPosition(cellName);
    this.callArcher();
    this.shooting();
  }

  defineArcherPosition(cellName) {
    switch (cellName[0]) {
      case "A":
        this.positionX = 1;
        break;
      case "B":
        this.positionX = 74;
        break;
      case "C":
        this.positionX = 148;
        break;
      case "D":
        this.positionX = 222;
        break;
      case "E":
        this.positionX = 296;
        break;
      case "F":
        this.positionX = 370;
        break;
      case "G":
        this.positionX = 444;
        break;
      case "H":
        this.positionX = 518;
        break;
      case "I":
        this.positionX = 592;
        break;
      default:
        break;
    }
    switch (cellName[1]) {
      case "1":
        this.positionY = 0;
        break;
      case "2":
        this.positionY = 88;
        break;
      case "3":
        this.positionY = 176;
        break;
      case "4":
        this.positionY = 264;
        break;
      case "5":
        this.positionY = 352;
        break;
      default:
        break;
    }
  }

  callArcher() {
    // Create a DOM element
    this.domElement = document.createElement("div");

    // Set the id
    this.domElement.className = "archer";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";

    // Append to the DOM
    const parentElm = document.getElementById("game-zone");
    parentElm.appendChild(this.domElement);
  }

  killArcher() {
    this.domElement.className = "archer-dead";
    this.playScream();
    setTimeout(() => {
      this.domElement.remove();
    }, 900);
  }

  takeAim() {
    this.domElement.className = "archer-shooting";
  }

  shooting() {
    setInterval(() => {
      if (this.domElement.className === "archer-shooting") {
        this.playArcherSound();
        const newArrow = new Arrow(this.positionX, this.positionY, this.width);
        preGame.game.arrowsArr.push(newArrow);
      }
    }, 900);
  }

  atEase() {
    this.domElement.className = "archer";
  }

  playArcherSound() {
    const archerSound = document.getElementById("bow");
    archerSound.volume = 0.1;
    archerSound.play();
  }

  playScream() {
    const scream = document.getElementById("scream");
    scream.volume = 0.2;
    scream.play();
  }
}

class Enemy {
  constructor() {
    this.width = 70;
    this.height = 73;
    this.domElement = null;
    this.runSpeed = 3;
    this.health = 60;
    this.attackDuration = 1300;
    this.defineEnemyPosition();
    this.callEnemy();
  }

  defineEnemyPosition() {
    this.positionX = 800;
    this.startingPosition = Math.random() * 5;
    if (this.startingPosition < 1) {
      this.positionY = 0;
    } else if (this.startingPosition < 2) {
      this.positionY = 88;
    } else if (this.startingPosition < 3) {
      this.positionY = 176;
    } else if (this.startingPosition < 4) {
      this.positionY = 264;
    } else {
      this.positionY = 352;
    }
  }

  callEnemy() {
    this.domElement = document.createElement("div");

    this.domElement.className = "enemy";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";

    const parentElm = document.getElementById("game-zone");
    parentElm.appendChild(this.domElement);
  }

  moveEnemy() {
    if (!this.attacking) {
      this.positionX -= this.runSpeed;
      this.domElement.style.left = this.positionX + "px";

      // Check if there is a collision between the Enemy and any Archer
      preGame.game.archerArr.forEach((archer) => {
        const rectEnemy = this.domElement.getBoundingClientRect();
        const rectArcher = archer.domElement.getBoundingClientRect();

        if (
          rectEnemy.left < rectArcher.right &&
          rectEnemy.right > rectArcher.left &&
          rectEnemy.top < rectArcher.bottom &&
          rectEnemy.bottom > rectArcher.top
        ) {
          this.positionX -= 20;

          setTimeout(() => {
            this.startAttack(archer);
          }, 200);
        }
      });

      if (this.positionX <= 0 - this.width) {
        location.href = "./game-over.html";
        preGame.game.callForScore();
      }
    } else {
      // If an enemy is already attacking, delay it's movement
      const currentTime = new Date().getTime();
      if (currentTime - this.attackStartTime >= this.attackDuration) {
        this.stopAttack(this.attackedArcher);
      }
    }
  }

  startAttack(archer) {
    this.attacking = true;
    this.attackedArcher = archer;
    this.attackStartTime = new Date().getTime();
    this.domElement.className = "enemy-attack";
  }

  stopAttack(archer) {
    this.attacking = false;
    this.attackStartTime = null;
    this.domElement.className = "enemy";
    archer.killArcher();
    preGame.game.archerArr = preGame.game.archerArr.filter((a) => a !== archer);
  }

  deadEnemy() {
    this.domElement.className = "enemy-dead";
    preGame.game.enemyArr = preGame.game.enemyArr.filter(
      (enemy) => enemy !== this
    );

    setTimeout(() => {
      this.domElement.remove();
    }, 1000);
  }
}

class Arrow {
  constructor(archerX, archerY, archerWidth) {
    this.power = 10;
    this.height = 2;
    this.width = 20;
    this.speed = 1;
    this.positionX = archerX + archerWidth;
    this.positionY = archerY + 33;
    this.startFlying();
  }
  startFlying() {
    this.domElement = document.createElement("div");

    this.domElement.className = "arrow";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";

    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";

    const parentElm = document.getElementById("game-zone");
    parentElm.appendChild(this.domElement);
    this.fly();
  }
  fly() {
    const flyInterval = setInterval(() => {
      this.positionX += this.speed;
      this.domElement.style.left = this.positionX + "px";

      // Remove the arrow if it reaches the end of the board
      if (this.positionX >= preGame.game.gameZoneWidth) {
        clearInterval(flyInterval);
        this.domElement.remove();
        preGame.game.arrowsArr = preGame.game.arrowsArr.filter(
          (arrow) => arrow !== this
        );
      } else {
        // Verify collision with enemies
        const hitEnemy = preGame.game.enemyArr.find((enemy) => {
          const enemyRect = enemy.domElement.getBoundingClientRect();
          const arrowRect = this.domElement.getBoundingClientRect();

          return (
            arrowRect.left < enemyRect.right &&
            arrowRect.right > enemyRect.left &&
            arrowRect.top < enemyRect.bottom &&
            arrowRect.bottom > enemyRect.top
          );
        });

        if (hitEnemy) {
          this.hit(hitEnemy);
          clearInterval(flyInterval);
          this.domElement.remove();
          preGame.game.arrowsArr = preGame.game.arrowsArr.filter(
            (arrow) => arrow !== this
          );
        }
      }
    }, 7);
  }
  hit(hitEnemy) {
    hitEnemy.health -= this.power;

    if (hitEnemy.health <= 0) {
      hitEnemy.deadEnemy();
    } else {
      hitEnemy.domElement.className = "enemy-hurt";
      setTimeout(() => {
        hitEnemy.domElement.className = "enemy";
      }, 250);
    }
  }
}

class Pregame {
  constructor() {
    this.startGameButton = document.getElementById("start");

    this.startGameButton.addEventListener("click", (click) => {
      this.pregameDiv = document.getElementById("pregame");
      this.pregameDiv.style.display = "none";

      this.boardPreGame = document.getElementById("board-pregame");
      this.boardPreGame.id = "board";

      this.uiPreGame = document.getElementById("ui-pregame");
      this.uiPreGame.id = "ui";

      this.game = new Game();

      click.stopPropagation();
    });
  }
}

const preGame = new Pregame();
