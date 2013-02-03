$(document).ready(function() {
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
