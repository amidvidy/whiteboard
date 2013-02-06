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
    var $undoButton = $("#undoButton");

    // Initialize state
    ctx.lineWidth = 3.0;
    // Holds history of each segment
    var segments = [];
    // Holds the current segment being drawn
    var curSegment = {};
    var mouseDown = false;

    var drawSegment = function(segment) {
        ctx.beginPath();
        ctx.moveTo(segment.start.x, segment.start.y);
        ctx.lineTo(segment.end.x, segment.end.y);
        ctx.moveTo(segment.end.x, segment.end.y);
        ctx.stroke();
    };

    var undoLastSegment = function() {
        clearBoard();
        segments.pop();
        segments.forEach(function(segment) {
            drawSegment(segment);
        });
    };

    var clearBoard = function() {
        ctx.clearRect(0, 0, board.width, board.height);
    };

    var mousePos = function(event) {
        var offset = $(this).offset();
        return {
            x: event.pageX - offset.left,
            y:  event.pageY - offset.top
        };
    };

    // Style for the lazy
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

    // undo button
    $undoButton.click(function() {
        undoLastSegment();
    });

    // reset button
    $resetButton.click(function() {
        clearBoard();
    });

    // drawing events
    $board.mousedown(function(event) {
        // Start drawing
        ctx.beginPath();
        curSegment.start = mousePos.call(this, event);
        mouseDown = true;
    });

    $board.mouseup(function() {
        mouseDown = false;
    });

    $board.mousemove(function(event) {
        var pos = mousePos.call(this, event);

        if (mouseDown) {
            // Record segment
            curSegment.end = pos;
            curSegment.rgb = ctx.strokeStyle;

            segments.push(curSegment);

            // Draw segment
            drawSegment(curSegment);

            // Start next segment and end of current segment
            curSegment.start = curSegment.end;

        }
    });

});
