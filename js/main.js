class Game {
  constructor() {
    this.archerArr = [];
    this.enemyArr = [];
    this.arrowsArr = [];
    this.boardWidth = 0;
    this.boardHeigth = 0;
    this.gameZoneWidth = 662;
    this.gameZomeHeigth = 441;
    this.start();
  }

  start() {
    this.getArcherPosition();
    this.releaseTheHorde();
  }

  releaseTheHorde() {
    setInterval(() => {
      const newEnemy = new Enemy();
      this.enemyArr.push(newEnemy);
    }, 3 * 1000);

    /*setTimeout(() => {
      setInterval(() => {
        const newEnemy = new Enemy();
        this.enemyArr.push(newEnemy);
      }, 4 * 1000);
    }, 10 * 1000);

    setTimeout(() => {
      setInterval(() => {
        const newEnemy = new Enemy();
        this.enemyArr.push(newEnemy);
      }, 2 * 1000);
    }, 20 * 1000);*/

    setInterval(() => {
      //move all enemies
      this.enemyArr.forEach((enemyInstance) => {
        enemyInstance.moveEnemy();
      });

      // set archers state (shooting or not)
      this.setArchersState();
    }, 100);
  }

  getArcherPosition() {
    const clickZone = document.getElementById("game-zone");

    clickZone.addEventListener("click", function (click) {
      const clickPositionX = click.offsetX;
      const clickPositionY = click.offsetY;

      const column = Math.floor(clickPositionX / (game.gameZoneWidth / 9));
      const row = Math.floor(clickPositionY / (game.gameZomeHeigth / 5));

      const columnName = String.fromCharCode(65 + column); // Convert column to letter (A, B, C, ...)
      const rowNumber = row + 1; // Add 1 to convert row to number (1, 2, 3, ...)

      const cellName = columnName + rowNumber;

      const newArcher = new Archer(cellName);
      game.archerArr.push(newArcher);
    });
  }

  setArchersState() {
    this.archerArr.forEach((archer) => {
      const eligibleTargets = this.enemyArr.filter((enemy) => {
        return (
          archer.positionY === enemy.positionY &&
          archer.positionX < enemy.positionX
        );
      });

      if (eligibleTargets.length > 0) {
        archer.takeAim();
      } else {
        archer.atEase();
      }
    });
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
        const newArrow = new Arrow(this.positionX, this.positionY, this.width);
        game.arrowsArr.push(newArrow);
      }
    }, 900);
  }

  atEase() {
    this.domElement.className = "archer";
  }
}

class Enemy {
  constructor() {
    this.width = 70;
    this.height = 73;
    this.domElement = null;
    this.runSpeed = 3;
    this.health = 50;
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
      game.archerArr.forEach((archer) => {
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
    game.archerArr = game.archerArr.filter((a) => a !== archer);
  }

  deadEnemy() {
    this.domElement.className = "enemy-dead";
    game.enemyArr = game.enemyArr.filter((enemy) => enemy !== this);

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
    this.hit();
  }
  fly() {
    const flyInterval = setInterval(() => {
      this.positionX += this.speed;
      this.domElement.style.left = this.positionX + "px";

      // Remove the arrow if it reaches the end of the board
      if (this.positionX >= game.gameZoneWidth) {
        clearInterval(flyInterval);
        this.domElement.remove();
        game.arrowsArr = game.arrowsArr.filter((arrow) => arrow !== this);
      } else {
        // Verify collision with enemies
        const hitEnemy = game.enemyArr.find((enemy) => {
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
          game.arrowsArr = game.arrowsArr.filter((arrow) => arrow !== this);
        }
      }
    }, 2);
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

const game = new Game();
