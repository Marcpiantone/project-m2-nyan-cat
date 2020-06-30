// This class will allow to make cute animations for my EXPLOSIONS

class Explosion {
  constructor(root, xPos, yPos) {
    this.root = root;

    this.height = EXPLOSION_HEIGHT;
    this.width = EXPLOSION_WIDTH;
    this.speed = EXPLOSION_SPEED;

    this.x = xPos + ENEMY_WIDTH / 2 - EXPLOSION_WIDTH / 2;
    this.y = yPos + ENEMY_HEIGHT / 2 - EXPLOSION_HEIGHT / 2;

    this.domElement = document.createElement("img");

    this.domElement.src = "./images/explosion.png";

    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.height = `${this.height}px`;
    this.domElement.style.zIndex = 6; // Above enemy

    root.appendChild(this.domElement);
  }
  explode() {
    let counter = 0;
    let i = setInterval(() => {
      let previousWidth = this.width;
      let previousHeight = this.height;
      this.width = this.width * (1 + this.speed);
      this.height = this.height * (1 + this.speed);
      this.domElement.style.width = `${this.width}px`;
      this.domElement.style.height = `${this.height}px`;
      this.x = this.x - (this.width - previousWidth) / 2;
      this.y = this.y - (this.height - previousHeight) / 2;
      this.domElement.style.left = `${this.x}px`;
      this.domElement.style.top = `${this.y}px`;
      counter++;
      if (counter > 10) {
        this.root.removeChild(this.domElement);
        clearInterval(i);
      }
    }, 20);
  }
}
