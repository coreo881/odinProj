// HELPER FUNCTIONS
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function generateGrid(gridNumber) {
  removeAllChildNodes(gridContainer);
  for (let index = 0; index < gridNumber; index++) {
    for (let jindex = 0; jindex < gridNumber; jindex++) {
      let newGridItem = document.createElement("div");
      newGridItem.addEventListener("mouseenter", function () {
        this.classList.add("highlighted");
      });
      newGridItem.classList.add("gridItem");
      gridContainer.appendChild(newGridItem);
    }
  }
}

// MAIN FUNCTIONS
function clearGrid() {
  let highlightedGridItems = rootElement.querySelectorAll(".highlighted");
  highlightedGridItems.forEach((element) =>
    element.classList.remove("highlighted")
  );
}

function newGrid() {
  let gridNumber = prompt(
    "Type a number to generate a grid of that size. (Limit 100)"
  );

  while (isNaN(gridNumber) || gridNumber > 100 || gridNumber <= 0) {
    let message = "";
    if (isNaN(gridNumber)) {
      message = "Type a NUMBER to generate a grid of that size. (Limit 100)";
    } else if (gridNumber > 100) {
      message =
        "THAT'S TOO HIGH!!!\n\nType a number to generate a grid of that size. (Limit 100)";
    } else if (gridNumber <= 0) {
      message =
        "THAT'S TOO LOW!!!\n\nType a number to generate a grid of that size. (Limit 100)";
    }

    gridNumber = prompt(message);
  }

  rootElement.style.setProperty("--gridSize", gridNumber);
  generateGrid(gridNumber);
}

const rootElement = document.documentElement;
const gridContainer = document.querySelector(".gridContainer");
const newGridBtn = rootElement.querySelector(".newGrid");
const clearGridBtn = rootElement.querySelector(".clearGrid");

newGridBtn.addEventListener("click", function () {
  newGrid();
});
clearGridBtn.addEventListener("click", function () {
  clearGrid();
});

// start things off with a new grid
generateGrid(4);
