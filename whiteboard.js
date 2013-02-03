// This code isn't going to be pretty. Just trying to get a feel for the html5 canvas API.
$(document).ready(function() {

    // Initialize canvas
    var board = document.getElementById("board");
    var ctx = board.getContext("2d");

    // Initialize jQuery objects
    var $board = $(board);
    var $colorPicker = $("#colorPicker");
    var $widthPicker = $("#widthPicker");
    var $resetButton = $("#resetButton");

    // Initialize state
    ctx.lineWidth = 3.0;
    var mouseDown = false;

    // Style
    $board.css('border', '1px solid black');

    // color picking
    $colorPicker.spectrum({
        color: "#FFFFF",
        change: function(color) {
            ctx.strokeStyle = color.toHexString();
        }
    });

    // width picking
    $widthPicker.change(function() {
        ctx.lineWidth = $(this).val();
    });

    // reset button
    $resetButton.click(function() {
        ctx.clearRect(0, 0, board.width, board.height);
    });

    // drawing events
    $board.mousedown(function() {
        ctx.beginPath();
        mouseDown = true;
    });

    $board.mouseup(function() {
        mouseDown = false;
    });

    $board.mousemove(function(event) {
        var offset = $(this).offset();
        var mouseX = event.pageX - offset.left;
        var mouseY = event.pageY - offset.top;

        if (mouseDown) {
            ctx.lineTo(mouseX, mouseY);
            ctx.moveTo(mouseX, mouseY);
            ctx.stroke();
        }
    });

    // Start drawing!
    ctx.beginPath();
});
