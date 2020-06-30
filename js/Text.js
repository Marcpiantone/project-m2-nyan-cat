// This class is not used in the project yet.
class Text {
  // The constructor has three parameters. Here is an example of how you would create
  // an instance of this class
  constructor(root, xPos, yPos, style) {
    // We create a DOM element, set its CSS attributes then append it to the parent DOM element. We also
    // set the \`domElement\` property of the instance to the newly created DOM element so we can update it later¸
    const div = document.createElement("div");

    div.className = `${style}`;
    div.style.position = "absolute";
    div.style.left = xPos;
    div.style.top = yPos;
    if (style === "big") {
      div.style.font = "15px 'Press Start 2P'";
    }
    if (style === "small") {
      div.style.font = "7px 'Press Start 2P'";
    }
    div.style.color = "white";
    div.style.padding = "5px";
    div.style.zIndex = 2000;
    root.appendChild(div);

    this.domElement = div;
    this.rect = this.domElement.getBoundingClientRect();
    console.log(this.rect);
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
    this.rect = this.domElement.getBoundingClientRect();
    console.log(this.rect);
  }
  delete() {
    this.domElement.innerText = "";
  }
}
