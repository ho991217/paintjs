const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const colorPicker = document.getElementById("pick-color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const fillIcon = document.getElementById("fill");
const brushIcon = document.getElementById("brush");
const saveBtn = document.getElementById("jsSave");
const HIDDEN_CLASSNAME = "hidden";
const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

colorPicker.style.backgroundColor = colorPicker.value;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  mode.style.color = color;
}

function onColorChange(event) {
  const colorVal = event.target.value;
  ctx.strokeStyle = colorVal;
  ctx.fillStyle = colorVal;
  mode.style.color = colorVal;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  stopPainting;
  if (filling === true) {
    // painting = true;
    filling = false;
    fillIcon.classList.remove(HIDDEN_CLASSNAME);
    brushIcon.classList.add(HIDDEN_CLASSNAME);
  } else {
    // painting = false;
    filling = true;
    fillIcon.classList.add(HIDDEN_CLASSNAME);
    brushIcon.classList.remove(HIDDEN_CLASSNAME);
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleBtnClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJs[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

colorPicker.addEventListener("input", onColorChange);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleBtnClick);
}
