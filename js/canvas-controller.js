'use strict';
var gCanvas = document.querySelector('#canvas');
var gCtx = gCanvas.getContext('2d');
var gIsBeginPath = false;


function onMouseMovement(ev) {
    console.log(ev);
    var xAxis = document.querySelector('.mouse-x');
    var yAxis = document.querySelector('.mouse-y');
    var x = ev.offsetX;
    var y = ev.offsetY;
    xAxis.innerText = x;
    yAxis.innerText = y;
    if (gIsBeginPath) {
        gCtx.lineTo(x, y);
        gCtx.stroke();
    }
}

function onTogglePath(ev) {
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