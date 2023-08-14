class Game {
  constructor() {
    this.archerArr = [];
    this.enemyArr = [];
    this.boardWidth = 0;
    this.boardHeigth = 0;
    this.gameZoneWidth = 662;
    this.gameZomeHeigth = 441;
  }

  start() {
    this.getArcherPosition();
    this.releaseTheHorde();
  }

  releaseTheHorde() {
    setInterval(() => {
      const newEnemy = new Enemy();
      this.enemyArr.push(newEnemy);
    }, 10000 * 1000);

    setInterval(() => {
      this.enemyArr.forEach((enemyInstance) => {
        enemyInstance.moveEnemy();
      });
    }, 100);
  }

  getArcherPosition() {
    const clickZone = document.getElementById("game-zone");

    clickZone.addEventListener("click", function (click) {
      const clickPositionX = click.offsetX;
      const clickPositionY = click.offsetY;
      click.stopPropagation();

      const column = Math.floor(clickPositionX / (game.gameZoneWidth / 9));
      const row = Math.floor(clickPositionY / (game.gameZomeHeigth / 5));

      const columnName = String.fromCharCode(65 + column); // Convert column to letter (A, B, C, ...)
      const rowNumber = row + 1; // Add 1 to convert row to number (1, 2, 3, ...)

      const cellName = columnName + rowNumber;

      const newArcher = new Archer(clickPositionX, clickPositionY, cellName);
      game.archerArr.push(newArcher);

      console.log(game.archerArr);
      console.log("Position X : ", clickPositionX);
      console.log("Position Y : ", clickPositionY);
      console.log("Cell : ", cellName);
    });
  }
}

class Archer {
  constructor(clickPositionX, clickPositionY, cellName) {
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
}

class Enemy {
  constructor() {
    this.width = 70;
    this.height = 73;
    this.domElement = null;
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
    this.positionX += 2;
    this.domElement.style.right = this.positionX + "px";

    if (this.positionX >= 662) {
      location.href = "./game-over.html";
    }
  }
}

const game = new Game();
game.start();
