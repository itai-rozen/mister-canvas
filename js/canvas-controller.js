'use strict';
var gCanvas;
var gCtx;
var gIsDrawing;
var gIsErasing;
var gTool;
var gProImages;

function initCanvas() {
    gCanvas = document.querySelector('#canvas');
    gCtx = gCanvas.getContext('2d');
    gIsDrawing = false;
    gIsErasing = false;
    gTool = 'pencil';
    gProImages = loadImages();
}

function loadImages() {
    let images = [];
    for (let i = 0; i < 4; i++) {
        let image = new Image();
        image.src = `./img/${i}.jpg`
        images.push(image);
    }
    return images;
}

function onMouseMovement(ev) {
    var x = ev.offsetX;
    var y = ev.offsetY;
    if (gIsDrawing) {
        gCtx.lineTo(x, y);
        drawWithTool(x, y);
    } else return;
}

function drawWithTool(x, y) {
    if (gIsErasing) erasePath(x, y);
    else if (gTool === 'pencil') drawPencil();
    else if (gTool === 'brush') drawBrush(x, y);
    else if (gTool === 'rect') drawRect(x, y);
    else return;
}

function drawPencil() {
    gCtx.stroke();
}

function erasePath(x, y) {
    gCtx.save();
    gCtx.strokeStyle = '#ffffff';
    gCtx.fillStyle = '#ffffff';
    gCtx.arc(x, y, 5, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.closePath();
    gCtx.fill();
    gCtx.restore();
    gCtx.beginPath();
}

function drawBrush(x, y) {
    gCtx.save();
    gCtx.strokeStyle = gCtx.fillStyle;
    gCtx.arc(x, y, 10, 0, 2 * Math.PI);
    gCtx.stroke();
    gCtx.closePath();
    gCtx.fill();
    gCtx.beginPath();
    gCtx.restore();
}

function drawRect(x, y) {
    gCtx.rect(x - 5, y - 10, x + 5, y + 10);
    gCtx.stroke();
    gCtx.fill();
    gCtx.closePath();
    gCtx.beginPath();
}

function onMouseUp(ev) {
    ev.stopPropagation();
    gIsDrawing = false;
    gCtx.closePath();
}

function onMouseDown(ev) {
    ev.stopPropagation();
    var x = ev.offsetX;
    var y = ev.offsetY;
    gCtx.beginPath();
    gCtx.moveTo(x, y);
    gIsDrawing = true;
}

function onColorChange(color, property) {
    if (property === 'fill') gCtx.fillStyle = color;
    else gCtx.strokeStyle = color;
}

function onResetCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onToggleEraser() {
    if (!gIsErasing) {
        gIsErasing = true
        document.querySelector('.btn-eraser').classList.add('clicked');
    } else {
        gIsErasing = false;
        document.querySelector('.btn-eraser').classList.remove('clicked');
    }
}

function onSetRandImage() {
    let rand = parseInt(Math.random() * 4);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(gProImages[rand], 0, 0, gCanvas.width, gCanvas.height);
}

function onCheckMousePos(ev) {
    let targetId = ev.target.id;
    if (targetId !== 'canvas') {
        gIsDrawing = false;
        gCtx.closePath();
    }
}

function onChooseDrawTool(tool) {
    gTool = tool;
}
