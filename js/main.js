class BoardSquare {
  constructor(element, color){
    this.element = element;
    this.element.addEventListener("click", this, false);
    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
  }

  // Adding functin to handle click notification
  handleEvent(event){
    switch (event.type){
      case "click":
        if (this.isFaceUp || this.isMatched){
          return
        }

        this.isFaceUP = true;
        this.element.classList.add('flipped');
        squareFlipped(this);
    }
  }

  reset() {
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove('flipped');
  }

  matchFound() {
    this.isFaceUp = true;
    this.isMatched = true;
  }

  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName('faceup')[0];
    this.color = color;

    faceUpElement.classList.add(color);
  }
}

function generateHTMLForBoardSquares() {
  const numberOfSquares = 16;
  let squaresHTML = '';

  for (let i = 0; i < numberOfSquares; i++) {
    squaresHTML +=
      '<div class="col-3 board-square">\n' +
      '<div class="face-container">\n' +
      '<div class="facedown"></div>\n' +
      '<div class="faceup"></div>\n' +
      '</div>\n' +
      '</div>\n';
  }

  const boardElement = document.getElementById('gameboard');
  boardElement.innerHTML = squaresHTML;
}

const colorPairs = [];

function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    for (let i = 0; i < 8; i++) {
      colorPairs.push('color-' + i);
      colorPairs.push('color-' + i);
    }
// For some reason, this is where console.log("hello") fails to print
    return colorPairs;
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}

const boardSquares = [];

function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();

  const squareElements = document.getElementsByClassName("board-square");

  for (let i = 0; i < squareElements.length; i++) {

    const element = squareElements[i];
    const color = randomColorPairs[i];
    const square = new BoardSquare(element, color)
    boardSquares.push(square);
  }
}

// Start the game
setupGame();

// Adding remaining game logic
let firstFaceupSquare = null;

function squareFlipped(square) {
  if (firstFaceupSquare == null){
    firstFaceupSquare = square;
    return
  }

  if (firstFaceupSquare.color == square.color) {
    firstFaceupSquare.matchFound();
    square.matchFound();

    firstFaceupSquare = null;
  } else {
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    }, 400);
  }
}
