// This class will create an object "weapon" that the player can shoot
// Very similar to "enemy", except it works the other way around (goes up and destroys enemies)

class Weapon {
  constructor(root) {
    this.root = root;
    this.x = gameEngine.player.rect.left + PLAYER_WIDTH / 2 - WEAPON_WIDTH / 2;
    this.y = gameEngine.player.rect.top;
    this.height = WEAPON_HEIGHT;
    this.width = WEAPON_WIDTH;

    this.destroyed = false;
    // We create a DOM element
    this.domElement = document.createElement("img");

    // We give it a source
    this.domElement.src = "./images/missile2.png";
    // Let's add some CSS style and append it to the "app" node
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.height = `${this.height}px`;
    this.domElement.style.width = `${this.width}px`;
    this.domElement.style.zIndex = 6; //6 = Above enemy

    root.appendChild(this.domElement);

    // And a speed for moving upwards
    this.speed = 0.5; // Arbitrary

    //and
    this.rect = this.domElement.getBoundingClientRect();
  }

  // This new object will have a method update(timeDiff), in order to make it move frame after frame

  update(timeDiff) {
    this.y = this.y - timeDiff * this.speed; // upwards means -y
    this.domElement.style.top = `${this.y}px`;
    this.rect = this.domElement.getBoundingClientRect();

    //if to remove moving missiles
    if (this.rect.bottom <= 0) {
      this.root.removeChild(this.domElement);
      this.destroyed = true;
    }
  }
  delete() {
    this.destroyed = true;
    this.root.removeChild(this.domElement);
  }
}
