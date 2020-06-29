// Remove body margin
const body = document.querySelector("body");
const margin0 = (body.style.margin = "0");
// body.style.display = flex;
// body.style.justifyContent = center;

// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`
const gameEngine = new Engine(document.getElementById("app"));

// keydownHandler is a variable that refers to a function. The function has one parameter
// (does the parameter name matter?) which is called event. As we will see below, this function
// will be called every time the user presses a key. The argument of the function call will be an object.
// The object will contain information about the key press, such as which key was pressed.
const keydownHandler = (event) => {
  // We call the gameStart method to start the game
  console.log(`TEST ${gameEngine.gameStatus()}`);
  if (event.code === "Space") {
    if (gameEngine.gameStatus() === false) {
      gameEngine.gameStart();
    }
  }

  if (event.code === "Space") {
    if (gameEngine.gameStatus() === true) {
      gameEngine.player.shoot();
    }
  }
  // event.code contains a string. The string represents which key was press. If the
  // key is left, then we call the moveLeft method of gameEngine.player (where is this method defined?)
  if (event.code === "ArrowLeft") {
    gameEngine.player.moveLeft();
  }

  // If `event.code` is the string that represents a right arrow keypress,
  // then move our hamburger to the right
  if (event.code === "ArrowRight") {
    gameEngine.player.moveRight();
  }
};

// We add an event listener to document. document the ancestor of all DOM nodes in the DOM.
document.addEventListener("keydown", keydownHandler);

// We call the gameLoop method to start the game --> I'll put this in keydownHandler
//gameEngine.gameLoop();
