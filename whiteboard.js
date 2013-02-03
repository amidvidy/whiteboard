// This code isn't going to be pretty. Just trying to get a feel for the html5 canvas API.
$(document).ready(function() {

    // Initialize canvas
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");
    var $board = $(board);

    // Style
    $board.css('border', '1px solid black');

    ctx.beginPath();

    // mouse events
    var mouseDown = false;

    $board.mousedown(function() {
        ctx.beginPath();
        mouseDown = true;
    });

    $board.mouseup(function() {
        mouseDown = false;
    });

    $("#board").mousemove(function(event) {
        var offset = $(this).offset();
        var mouseX = event.pageX - offset.left;
        var mouseY = event.pageY - offset.top;

        if (mouseDown) {
            ctx.lineTo(mouseX, mouseY);
            ctx.moveTo(mouseX, mouseY);
            ctx.stroke();
        }
    });
});
