'use strict';
var gCanvas = document.querySelector('#canvas');
var gCtx = gCanvas.getContext('2d');
var gIsBeginPath = false;
var gIsErasing = false;


function onMouseMovement(ev) {
    var xAxis = document.querySelector('.mouse-x');
    var yAxis = document.querySelector('.mouse-y');
    var x = ev.offsetX;
    var y = ev.offsetY;

    xAxis.innerText = x;
    yAxis.innerText = y;
    if (gIsBeginPath) {
        gCtx.lineTo(x, y);
        gCtx.stroke();
    } else return;
}

function onTogglePath(ev) {
    ev.stopPropagation();
    if (!gIsBeginPath) {
        var x = ev.offsetX;
        var y = ev.offsetY;
        gCtx.beginPath();
        gCtx.moveTo(x, y);
        gIsBeginPath = true;
    } else {
        gIsBeginPath = false;
        gCtx.closePath();
    }
}

function onColorChange(color) {
    gCtx.strokeStyle = color;
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

function onCheckMousePos(ev) {
    let targetId = ev.target.id;
    if (targetId !== 'canvas') {
        gIsBeginPath = false;
        gCtx.closePath();
    }
}
