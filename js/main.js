class Game {
  constructor() {
    this.marineArr = [];
    this.boardWidth = 0;
    this.boardHeigth = 0;
    this.gameZoneWidth = 662;
    this.gameZomeHeigth = 441;
  }

  start() {
    this.getMarinePosition();
  }
  getMarinePosition() {
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

      const newMarine = new Marine(clickPositionX, clickPositionY, cellName);
      game.marineArr.push(newMarine);

      console.log(game.marineArr);
      console.log("Position X : ", clickPositionX);
      console.log("Position Y : ", clickPositionY);
      console.log("Cell : ", cellName);
    });
  }
}

class Marine {
  constructor(clickPositionX, clickPositionY, cellName) {
    this.width = 50;
    this.height = 50;
    this.domElement = null;
    this.defineMarinePosition(cellName);
    this.callSpaceMarine();
  }
  defineMarinePosition(cellName) {
    switch (cellName) {
      case "A1":
        this.positionX = 9;
        this.positionY = 18;
        break;
      case "A2":
        this.positionX = 9;
        this.positionY = 106;
        break;
      case "A3":
        this.positionX = 9;
        this.positionY = 194;
        break;
      case "A4":
        this.positionX = 9;
        this.positionY = 282;
        break;
      case "A5":
        this.positionX = 9;
        this.positionY = 370;
        break;
      case "B1":
        this.positionX = 83;
        this.positionY = 18;
        break;
      case "B2":
        this.positionX = 83;
        this.positionY = 106;
        break;
      case "B3":
        this.positionX = 83;
        this.positionY = 194;
        break;
      case "B4":
        this.positionX = 83;
        this.positionY = 282;
        break;
      case "B5":
        this.positionX = 83;
        this.positionY = 370;
        break;
      case "C1":
        this.positionX = 157;
        this.positionY = 18;
        break;
      case "C2":
        this.positionX = 157;
        this.positionY = 106;
        break;
      case "C3":
        this.positionX = 157;
        this.positionY = 194;
        break;
      case "C4":
        this.positionX = 157;
        this.positionY = 282;
        break;
      case "C5":
        this.positionX = 157;
        this.positionY = 370;
        break;
      case "D1":
        this.positionX = 231;
        this.positionY = 18;
        break;
      case "D2":
        this.positionX = 231;
        this.positionY = 106;
        break;
      case "D3":
        this.positionX = 231;
        this.positionY = 194;
        break;
      case "D4":
        this.positionX = 231;
        this.positionY = 282;
        break;
      case "D5":
        this.positionX = 231;
        this.positionY = 370;
        break;
      case "E1":
        this.positionX = 305;
        this.positionY = 18;
        break;
      case "E2":
        this.positionX = 305;
        this.positionY = 106;
        break;
      case "E3":
        this.positionX = 305;
        this.positionY = 194;
        break;
      case "E4":
        this.positionX = 305;
        this.positionY = 282;
        break;
      case "E5":
        this.positionX = 305;
        this.positionY = 370;
        break;
      case "F1":
        this.positionX = 379;
        this.positionY = 18;
        break;
      case "F2":
        this.positionX = 379;
        this.positionY = 106;
        break;
      case "F3":
        this.positionX = 379;
        this.positionY = 194;
        break;
      case "F4":
        this.positionX = 379;
        this.positionY = 282;
        break;
      case "F5":
        this.positionX = 379;
        this.positionY = 370;
        break;
      case "G1":
        this.positionX = 453;
        this.positionY = 18;
        break;
      case "G2":
        this.positionX = 453;
        this.positionY = 106;
        break;
      case "G3":
        this.positionX = 453;
        this.positionY = 194;
        break;
      case "G4":
        this.positionX = 453;
        this.positionY = 282;
        break;
      case "G5":
        this.positionX = 453;
        this.positionY = 370;
        break;
      case "H1":
        this.positionX = 527;
        this.positionY = 18;
        break;
      case "H2":
        this.positionX = 527;
        this.positionY = 106;
        break;
      case "H3":
        this.positionX = 527;
        this.positionY = 194;
        break;
      case "H4":
        this.positionX = 527;
        this.positionY = 282;
        break;
      case "H5":
        this.positionX = 527;
        this.positionY = 370;
        break;
      case "I1":
        this.positionX = 601;
        this.positionY = 18;
        break;
      case "I2":
        this.positionX = 601;
        this.positionY = 106;
        break;
      case "I3":
        this.positionX = 601;
        this.positionY = 194;
        break;
      case "I4":
        this.positionX = 601;
        this.positionY = 282;
        break;
      case "I5":
        this.positionX = 601;
        this.positionY = 370;
        break;

      default:
        console.log(`Je ne sais pas où aller ${game.cellname}`);
        break;
    }
  }

  callSpaceMarine() {
    // Create a DOM element
    this.domElement = document.createElement("div");

    // Set the id
    this.domElement.id = "marine";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.top = this.positionY + "px";

    // Append to the DOM
    const parentElm = document.getElementById("game-zone");
    parentElm.appendChild(this.domElement);
  }
}

const game = new Game();
game.start();
