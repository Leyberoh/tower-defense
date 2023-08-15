class Game {
  constructor() {
    this.archerArr = [];
    this.enemyArr = [];
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
    }, 5 * 1000);

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
      let eligibleTarget = this.enemyArr.filter((enemy) => {
        return (
          archer.positionY === enemy.positionY /*&&
          archer.positionX > enemy.positionX*/
        );
      });

      if (eligibleTarget.length > 0) {
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
    console.log("je tire");
  }

  atEase() {
    this.domElement.className = "archer";
    console.log("je branle");
  }
}

class Enemy {
  constructor() {
    this.width = 70;
    this.height = 73;
    this.domElement = null;
    this.runSpeed = 3;
    this.attackDuration = 1300;
    this.defineEnemyPosition();
    this.callEnemy();
  }

  defineEnemyPosition() {
    this.positionX = -200;
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
    this.domElement.style.right = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";

    const parentElm = document.getElementById("game-zone");
    parentElm.appendChild(this.domElement);
  }

  moveEnemy() {
    if (!this.attacking) {
      this.positionX += this.runSpeed;
      this.domElement.style.right = this.positionX + "px";

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
          this.positionX += 20;

          setTimeout(() => {
            this.startAttack(archer);
          }, 200);
        }
      });

      if (this.positionX >= 662) {
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
}

const game = new Game();
