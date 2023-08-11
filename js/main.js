class Game {
  constructor() {
    this.marineArr = [];
  }

  start() {
    this.setEventListener();
  }
  setEventListener() {
    const clickZone = document.getElementById("board");

    clickZone.addEventListener("click", function (click) {
      const positionX = click.offsetX;
      const positionY = click.offsetY;
      click.stopPropagation();

      console.log("Board clicked");
      console.log("Position X : ", positionX);
      console.log("Position Y : ", positionY);
    });
  }
}

class Marine {
  constructor() {
    this.width = 50;
    this.height = 50;
    this.positionX = 0;
    this.positionY = 0;
    this.domElement = null;
    this.createDomElement();
  }
  createDomElement() {
    // Create a DOM element
    this.domElement = document.createElement("div");

    // Set the id
    this.domElement.id = "marine";
    this.domElement.style.width = this.width + "px";
    this.domElement.style.height = this.height + "px";
    this.domElement.style.left = this.positionX + "px";
    this.domElement.style.bottom = this.positionY + "px";

    // Append to the DOM
    const parentElm = document.getElementById("board");
    parentElm.appendChild(this.domElement);
  }
}

const marine = new Marine();

const game = new Game();
game.start();
