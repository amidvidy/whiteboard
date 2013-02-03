// This code isn't going to be pretty. Just trying to get a feel for the html5 canvas API.
$(document).ready(function() {

    // Initialize objects
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");


    ctx.beginPath();

    $("#board").mousemove(function(event) {
        var offset = $(this).offset();
        var mouseX = event.pageX - offset.left;
        var mouseY = event.pageY - offset.top;

        ctx.lineTo(mouseX, mouseY);
        ctx.moveTo(mouseX, mouseY);
        ctx.closePath();
        ctx.stroke();
    });
});
