// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    // We will use the same approach to manage our missiles
    this.weapons = [];
    // We add the background image to the game
    addBackground(this.root);
    // And a score property
    this.score = 0;
    // And a started game property
    this.gameStarted = false;
    // And a dead player property
    this.playerDead = false;
    // And a counter for dead enemies
    this.deadEnemyCounter = 0;
    //And the texts on the screen
    this.scoreText = new Text(
      document.getElementById("app"),
      "2px",
      "2px",
      "small"
    );
    this.scoreTextExploded = false;
    this.resultText = new Text(
      document.getElementById("app"),
      "85px",
      "100px",
      "big"
    );
    this.restartText = new Text(
      document.getElementById("app"),
      "85px",
      "200px",
      "big"
    );

    this.instructionText1 = new Text(
      document.getElementById("app"),
      "150px",
      "280px",
      "small"
    );
    this.instructionText2 = new Text(
      document.getElementById("app"),
      "30px",
      "300px",
      "small"
    );
    this.restartText.update(`(SPACE) Start`);
    this.instructionText1.update(`IN GAME`);
    this.instructionText2.update(
      `(←) move left ; (→) move right ; (SPACE) shoot`
    );
    this.restartText.center();
    this.instructionText1.center();
    this.instructionText2.center();
  }

  gameStart = () => {
    this.enemies.forEach((enemy) => {
      enemy.delete();
    });
    this.gameLoop();
    this.gameStarted = true;
    this.instructionText1.delete();
    this.instructionText2.delete();
    this.resultText.delete();
    this.restartText.delete();
    this.deadEnemyCounter = 0;
    this.scoreText.update(`Score: ${this.deadEnemyCounter}`);
  };

  gameStop = () => {
    this.gameStarted = false;
    this.scoreText.delete();
    if (this.scoreTextExploded === false) {
      this.resultText.update(`Your Score : ${this.deadEnemyCounter}`);
    } else {
      this.resultText.update(`Your Score : ${this.deadEnemyCounter}`);
      this.instructionText2.update(
        `You blasted the score counter, you clumsy!`
      );
    }
    this.restartText.update(`(SPACE) Restart`);
    this.resultText.center();
    this.instructionText2.center();
    this.restartText.center();
    this.scoreTextExploded = false;
  };

  gameStatus = () => {
    return this.gameStarted;
  };
  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    if (this.gameStarted === true) {
      this.enemies.forEach((enemy) => {
        enemy.update(timeDiff);
      });
    }
    if (this.gameStarted === true) {
      this.weapons.forEach((weapon) => {
        weapon.update(timeDiff);
      });
    }
    this.enemies.forEach((enemy) => {
      this.weapons.forEach((weapon) => {
        if (
          enemy.rect.left < weapon.rect.left &&
          enemy.rect.right > weapon.rect.right &&
          enemy.rect.bottom >= weapon.rect.top
        ) {
          const explosion = new Explosion(this.root, enemy.x, enemy.y);
          explosion.explode();
          enemy.destroyed = true;
          weapon.destroyed = true;
          enemy.delete();
          weapon.delete();
        }
        if (
          this.scoreText.rect.left < weapon.rect.left &&
          this.scoreText.rect.right > weapon.rect.right &&
          this.scoreText.rect.bottom >= weapon.rect.top
        ) {
          const explosion = new Explosion(
            this.root,
            this.scoreText.rect.left,
            this.scoreText.rect.top
          );
          explosion.explode();
          this.scoreText.delete();
          this.scoreTextExploded = true;
        }
      });
    });

    this.enemies.forEach((enemy) => {
      if (enemy.destroyed === true) {
        if (this.scoreTextExploded === false) {
          this.deadEnemyCounter += 1;
          this.scoreText.update(`Score: ${this.deadEnemyCounter}`);
        } else {
          this.deadEnemyCounter = 0;
        }
      }
    });
    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });
    this.weapons = this.weapons.filter((weapon) => {
      return !weapon.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }
    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      this.gameStarted = false;
      this.playerDead = true;
      this.gameStop();
      //window.alert("Game over");
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let dead = false;
    this.enemies.forEach((enemy) => {
      if (
        // 1st implementation ; quick and easy
        this.player.rect.left === enemy.rect.left &&
        this.player.rect.top <= enemy.rect.bottom - 15

        // 2nd implementation ; checking if the boxes of the enemy div actually onverlaps the box of our player
        // A.X (left) < B.X + B.Width (right)
        // A.X + A.Width (right) > B.X (left)
        // A.Y (top) < B.Y + B.Height (bottom)
        // A.Y + A.Height (bottom) > B.Y (top)

        // Works... But only once you moved the player ?!?!?

        // this.player.rect.left < enemy.rect.right &&
        // this.player.rect.right > enemy.rect.left &&
        // this.player.rect.top < enemy.rect.bottom - 15 &&
        // this.player.rect.bottom > enemy.rect.top
      ) {
        dead = true;
      }
    });
    return dead;
  };
}
