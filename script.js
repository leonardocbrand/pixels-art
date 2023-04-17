const colorPalette = () => {
  for (let index = 0; index < 4; index += 1) {
    const createDiv = document.createElement('div');
    createDiv.classList = 'color';
    const fatherDiv = document.querySelector('#color-palette');
    fatherDiv.appendChild(createDiv);
  }
};
colorPalette();

const colors = ['black', 'blue', 'green', 'red'];

for (let index = 0; index < colors.length; index += 1) {
  const boxColor = document.querySelectorAll('.color')[index];
  boxColor.style.backgroundColor = colors[index];
}

const randomBtn = document.getElementById('button-random-color');

const randomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

const storageBtnColor = () => {
  const colorsBox = document.querySelectorAll('.color');
  const colorsArray = [];
  for (let index = 1; index < colorsBox.length; index += 1) {
    const color = colorsBox[index].style.backgroundColor;
    colorsArray.push(color);
    localStorage.setItem('colorPalette', JSON.stringify(colorsArray));
  }
};

randomBtn.addEventListener('click', () => {
  const colorsBox = document.querySelectorAll('.color');

  for (let index = 1; index < colorsBox.length; index += 1) {
    colorsBox[index].style.backgroundColor = randomColor();
  }
  storageBtnColor();
});

const getColors = () => {
  const colorsStorage = JSON.parse(localStorage.getItem('colorPalette'));
  const colorsBox = document.querySelectorAll('.color');

  if (colorsStorage === null) {
    const colors = ['black', 'blue', 'green', 'red'];

    for (let index = 0; index < colors.length; index += 1) {
      const boxColor = document.querySelectorAll('.color')[index];
      boxColor.style.backgroundColor = colors[index];
    }
  } else {
    colorsBox[1].style.backgroundColor = colorsStorage[0];
    colorsBox[2].style.backgroundColor = colorsStorage[1];
    colorsBox[3].style.backgroundColor = colorsStorage[2];
  }
};

const createPixelBoard = (pixels) => {
  const pixelBoard = document.querySelector('#pixel-board');
  for (let index = 0; index < pixels; index += 1) {
    const div = document.createElement('div');
    pixelBoard.appendChild(div);
    div.classList.add('boardDiv');
    for (let index = 0; index < pixels; index += 1) {
      const createDiv = document.createElement('div');
      createDiv.className = 'pixel';
      createDiv.style.backgroundColor = 'rgb(255, 255, 255)';
      pixelBoard.lastChild.appendChild(createDiv);
    }
  }
};

createPixelBoard(5);

const selectColor = () => {
  const colorButtons = document.getElementsByClassName('color');

  for (const color of colorButtons) {
    color.addEventListener('click', (event) => {
      const buttonSelected = document.querySelector('.selected');

      if (buttonSelected !== null) {
        buttonSelected.classList.remove('selected');

        event.target.classList.add('selected');
      }
    });
  }
};
selectColor();

const paintPixel = () => {
  const pixels = document.getElementsByClassName('pixel');

  for (const pixel of pixels) {
    pixel.addEventListener('click', (event) => {
      const colorSelected = document.querySelector('.selected').style.backgroundColor;

      event.target.style.backgroundColor = colorSelected;
      saveBoard();
    });
  }
};
paintPixel();

const clearBoard = () => {
  const clearButton = document.getElementById('clear-board');
  const pixels = document.getElementsByClassName('pixel');

  clearButton.addEventListener('click', () => {
    for (const pixel of pixels) {
      pixel.style.backgroundColor = 'rgb(255, 255, 255)';
    }
    saveBoard();
  });
};
clearBoard();

const saveBoard = () => {
  const pixelsColor = [];
  const pixels = document.getElementsByClassName('pixel');

  for (const pixel of pixels) {
    const pixelColor = pixel.style.backgroundColor;
    pixelsColor.push(pixelColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(pixelsColor));
};

const loadSavedBoard = () => {
  const getPixelsColors = JSON.parse(localStorage.getItem('pixelBoard')) || [];
  const pixels = document.getElementsByClassName('pixel');
  const boardSizeValue = document.getElementById('board-size').value;
  loadBoardSize();

  if (boardSizeValue !== '') {
    for (let index = 0; index < (boardSizeValue * boardSizeValue); index += 1) {
      pixels[index].style.backgroundColor = getPixelsColors[index]; 
    }
  } else {
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index].style.backgroundColor = getPixelsColors[index];
    }
  }
};

const deleteBoard = () => {
  const main = document.querySelector('main');
  main.lastElementChild.remove();
};

const createBoard = () => {
  const main = document.querySelector('main');
  const pixelBoard = document.createElement('section');

  pixelBoard.id = 'pixel-board';
  main.append(pixelBoard);
};

const generateBoard = () => {
  const generateBoardButton = document.getElementById('generate-board');

  generateBoardButton.addEventListener('click', () => {
    const boardSizeInput = document.getElementById('board-size').value;
    if (boardSizeInput <= 5) {
      deleteBoard();
      createBoard();
      createPixelBoard(5);
      saveBoardSize();
      paintPixel();
    } else if (boardSizeInput >= 50) {
      deleteBoard();
      createBoard();
      createPixelBoard(50);
      saveBoardSize();
      paintPixel();
    } else if (boardSizeInput > 5 && boardSizeInput < 50) {
      deleteBoard();
      createBoard();
      createPixelBoard(boardSizeInput);
      saveBoardSize();
      paintPixel();
    }
  });
};
generateBoard();

const invalidBoardAlert = () => {
  const generateBoardButton = document.getElementById('generate-board');

  generateBoardButton.addEventListener('click', () => {
    const boardSizeInput = document.getElementById('board-size').value;

    if (boardSizeInput === '') {
      alert('Board inválido!');
    }
  });
};
invalidBoardAlert();

const saveBoardSize = () => {
  const inputValue = document.getElementById('board-size').value;

  localStorage.setItem('boardSize', inputValue);
}

const loadBoardSize = () => {
  const sizeStorage = localStorage.getItem('boardSize');

  if (sizeStorage !== null) {
    deleteBoard();
    createBoard();
    createPixelBoard(sizeStorage);
    paintPixel();
  } else {
    deleteBoard();
    createBoard();
    createPixelBoard(5);
    paintPixel();
  }
};


window.onload = () => {
  getColors();

  const blackColor = document.querySelector('.color');
  blackColor.classList.add('selected');

  loadSavedBoard();
};
