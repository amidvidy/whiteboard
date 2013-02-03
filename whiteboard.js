$(document).ready(function() {
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");
    ctx.beginPath();
    $("#board").click(function(event) {
        console.log('foo');

        var mouseX = event.pageX;
        var mouseY = event.pageY;
        ctx.lineTo(mouseX, mouseY);
        ctx.closePath();
        ctx.stroke();
    });
});
