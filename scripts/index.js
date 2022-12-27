// Constants

const DEFAULT_BRUSH_SIZE = 10;

const DEFAULT_ERASER_SIZE = 50;

const DEFAULT_BRUSH_COLOR = "#ef4444";

const DEFAULT_CANVAS_BACKGROUND_COLOR = "#ffffff";

// State

let brushSize = DEFAULT_BRUSH_SIZE;

let brushColor = DEFAULT_BRUSH_COLOR;

let canvasBackgroundColor = DEFAULT_CANVAS_BACKGROUND_COLOR;

let renderingContext;

let isMouseDown = false;

let drawings = [];

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

const downloadCanvasElement = document.getElementById("downloadCanvas");

// Event listeners

canvasBgColorPickerElement.addEventListener("change", onCanvasBgColorChange);

brushSizeRangeElement.addEventListener("change", onBrushSizeChange);

brushColorPickerElement.addEventListener("change", onBrushColorChange);

eraserElement.addEventListener("click", onEraserClicked);

brushElement.addEventListener("click", onBrushClicked);

clearCanvasElement.addEventListener("click", onClearCanvas);

saveCanvasElement.addEventListener("click", onSaveCanvas);

loadCanvasElement.addEventListener("click", onLoadCanvas);

deleteSavedCanvasElement.addEventListener("click", onDeleteCanvas);

canvasElement.addEventListener("mousedown", onMouseDown);

canvasElement.addEventListener("mouseup", onMouseUp);

canvasElement.addEventListener("mousemove", onMouseMove);

downloadCanvasElement.addEventListener("click", onDownloadCanvas);

// Utility functions

function setCanvasBackground() {
  renderingContext.fillStyle = canvasBackgroundColor;
  renderingContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
  drawings.length && restoreDrawing();
}

function setActiveToolStyles() {
  brushElement.classList.toggle("tool--active");
  eraserElement.classList.toggle("tool--active");
}

function setBrushAttributes(size, color) {
  brushSize = size;
  brushColor = color;
}

function setBrushSizeText() {
  let sizeToDisplay = brushSize;
  if (brushSize < 10) {
    sizeToDisplay = `0${brushSize}`;
  }
  brushSizeValueElement.textContent = sizeToDisplay;
}

function setRenderingContextAttributes(mousePosition) {
  renderingContext.strokeStyle = brushColor;
  renderingContext.lineWidth = brushSize;
  renderingContext.lineCap = "round";
  renderingContext.beginPath();
  renderingContext.moveTo(mousePosition.x, mousePosition.y);
}

function getMousePosition(e) {
  return {
    x: e.offsetX,
    y: e.offsetY,
  };
}

function drawLine(point) {
  renderingContext.lineTo(point.x, point.y);
  renderingContext.stroke();
}

function saveLine(coordinates) {
  let point = {
    x: coordinates.x,
    y: coordinates.y,
    brushColor,
    brushSize,
  };
  drawings.push(point);
}

function restoreDrawing() {
  for (let i = 1; i < drawings.length; i++) {
    renderingContext.strokeStyle = drawings[i].brushColor;
    renderingContext.lineWidth = drawings[i].brushSize;
    renderingContext.lineCap = "round";
    renderingContext.beginPath();
    renderingContext.moveTo(drawings[i - 1].x, drawings[i - 1].y);
    drawLine(drawings[i]);
  }
}

// Functions

function initCanvas() {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight - 72;
  renderingContext = canvasElement.getContext("2d");
  setCanvasBackground();
}

function onCanvasBgColorChange(e) {
  canvasBackgroundColor = e.target.value;
  setCanvasBackground();
}

function onEraserClicked() {
  setBrushAttributes(DEFAULT_ERASER_SIZE, canvasBackgroundColor);
  setActiveToolStyles();
}

function onBrushClicked() {
  setBrushAttributes(DEFAULT_BRUSH_SIZE, brushColorPickerElement.value);
  setActiveToolStyles();
}

function onBrushSizeChange(e) {
  brushSize = e.target.value;
  setBrushSizeText();
}

function onBrushColorChange(e) {
  brushColor = e.target.value;
}

function onMouseDown(e) {
  isMouseDown = true;
  const mousePosition = getMousePosition(e);
  setRenderingContextAttributes(mousePosition);
}

function onMouseUp() {
  isMouseDown = false;
}

function onMouseMove(e) {
  if (isMouseDown) {
    const mousePosition = getMousePosition(e);
    drawLine(mousePosition);
    saveLine(mousePosition);
  }
}

function onClearCanvas() {
  drawings = [];
  setCanvasBackground();
}

function onSaveCanvas() {
  localStorage.setItem("canvas", JSON.stringify(drawings));
}

function onLoadCanvas() {
  const shape = JSON.parse(localStorage.getItem("canvas")) || [];
  drawings = shape;
  drawings && restoreDrawing();
}

function onDeleteCanvas() {
  localStorage.removeItem("canvas");
}

function onDownloadCanvas() {
  downloadCanvasElement.href = canvasElement.toDataURL("image/jpeg", 1);
  downloadCanvasElement.download = "paint";
}

// On load

initCanvas();
