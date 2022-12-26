// State

let brushSize = 10;

let brushColor = "#ef4444";

let canvasBackgroundColor = "#ffffff";

let renderingContext;

let isMouseDown = false;

// Dom Elements

const canvasElement = document.getElementById("canvas");

const canvasBgColorPickerElement = document.getElementById("bgColorPicker");

const brushColorPickerElement = document.getElementById("brushColor");

const brushSizeRangeElement = document.getElementById("brushSize");

const brushSizeValueElement = document.getElementById("brushSizeValue");

const brushElement = document.getElementById("brush");

const eraserElement = document.getElementById("eraser");

const clearCanvasElement = document.getElementById("clearCanvas");

const saveCanvasElement = document.getElementById("saveCanvas");

const loadCanvasElement = document.getElementById("loadCanvas");

const deleteSavedCanvasElement = document.getElementById("deleteSavedCanvas");

// Event listeners

canvasBgColorPickerElement.addEventListener("change", setCanvasBg);

brushSizeRangeElement.addEventListener("change", setBrushSize);

brushColorPickerElement.addEventListener("change", setBrushColor);

eraserElement.addEventListener("click", onEraserClicked);

brushElement.addEventListener("click", onBrushClicked);

clearCanvasElement.addEventListener("click", clearCanvas);

saveCanvasElement.addEventListener("click", saveCanvas);

loadCanvasElement.addEventListener("click", loadCanvas);

deleteSavedCanvasElement.addEventListener("click", deleteSavedCanvas);

canvasElement.addEventListener("mousedown", onMouseDown);

canvasElement.addEventListener("mouseup", onMouseUp);

canvasElement.addEventListener("mousemove", onMouseMove);

// Functions

function setCanvasBg() {
  canvasBackgroundColor = canvasBgColorPickerElement.value;
  renderingContext.fillStyle = canvasBackgroundColor;
  renderingContext.fillRect(0, 0, canvas.width, canvas.height);
}

function setBrushSize(e) {
  brushSize = e.target.value;
  displayBrushSize();
}

function displayBrushSize() {
  let brushSizeValue = brushSize;
  if (brushSizeValue < 10) {
    brushSizeValue = `0${brushSizeValue}`;
  }
  brushSizeValueElement.textContent = brushSizeValue;
}

function setBrushColor(e) {
  brushColor = e.target.value;
}

function initCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 72;
  renderingContext = canvasElement.getContext("2d");
  setCanvasBg();
}

function onBrushClicked() {
  setActiveToolClass();
}

function onEraserClicked() {
  renderingContext.globalCompositeOperation = "destination-out";
  setActiveToolClass();
}

function setActiveToolClass() {
  brushElement.classList.toggle("tool--active");
  eraserElement.classList.toggle("tool--active");
}

function clearCanvas() {}

function saveCanvas() {}

function loadCanvas() {}

function deleteSavedCanvas() {}

function onMouseDown(e) {
  isMouseDown = true;
  const mouseCoordinates = getMousePosition(e);
  renderingContext.moveTo(mouseCoordinates.x, mouseCoordinates.y);
  renderingContext.beginPath();
  renderingContext.lineWidth = brushSize;
  renderingContext.strokeStyle = brushColor;
  renderingContext.lineCap = "round";
}

function onMouseMove(e) {
  if (isMouseDown) {
    const mouseCoordinates = getMousePosition(e);
    renderingContext.lineTo(mouseCoordinates.x, mouseCoordinates.y);
    renderingContext.stroke();
  }
}

function onMouseUp() {
  isMouseDown = false;
}

function getMousePosition(e) {
  const rect = canvasElement.getBoundingClientRect();
  const mouseCoordinatesRelativeToCanvas = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
  return mouseCoordinatesRelativeToCanvas;
}

// On load

initCanvas();
