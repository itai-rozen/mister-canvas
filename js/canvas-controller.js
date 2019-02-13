'use strict';
var gCanvas = document.querySelector('#canvas');
var gCtx = gCanvas.getContext('2d');
var gIsDrawing = false;
var gIsErasing = false;
var gTool = 'pencil';


function onMouseMovement(ev) {
    var xAxis = document.querySelector('.mouse-x');
    var yAxis = document.querySelector('.mouse-y');
    var x = ev.offsetX;
    var y = ev.offsetY;
    xAxis.innerText = x;
    yAxis.innerText = y;
    if (gIsDrawing) {
        gCtx.lineTo(x, y);
        if (gIsErasing) erasePath(x, y);
        else if (gTool === 'pencil') drawPencil();
        else if (gTool === 'brush') drawBrush(x,y);
        else if (gTool === 'rect') drawRect(x,y);
    } else return;
}

function drawPencil() {
    gCtx.stroke();
}

function erasePath(x, y) {
    gCtx.arc(x, y, 10, 0 , 2 * Math.PI);
    gCtx.stroke();
    gCtx.fillStyle = '#ffffff';
    gCtx.closePath();
    gCtx.fill();
    gCtx.beginPath();
}

function drawBrush(x,y){
    gCtx.arc(x, y, 10, 0 , 2 * Math.PI);
    gCtx.stroke();
    gCtx.closePath();
    gCtx.fill();
    gCtx.beginPath();
}

function drawRect(x,y){
    gCtx.rect(x-5,y-10,x+5,y+10);
    gCtx.stroke();
    gCtx.closePath();
    gCtx.fill();
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

function onColorChange(color) {
    gCtx.strokeStyle = color;
    gCtx.fillStyle = color;
}

function onResetCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function onToggleEraser() {
  
    if (!gIsErasing) {
        gCtx.save();
        gCtx.strokeStyle = '#ffffff';
        gIsErasing = true
    } else {
        gCtx.restore();
        gIsErasing = false;
    }
}

function setRandImage(){
    let rand = parseInt(Math.random() * 4);
    let img = new Image();
    img.src = `img/${rand}.jpg`
    gCtx.drawImage(img,0,0,gCanvas.height,gCanvas.width);
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
