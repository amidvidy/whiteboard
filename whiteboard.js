// This code isn't going to be pretty. Just trying to get a feel for the html5 canvas API.
$(document).ready(function() {

    // Whiteboard constructor
    var Whiteboard = function(canvas) {
        this.canvas = canvas
    }



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
        console.log(segment)
        ctx.beginPath();
        ctx.moveTo(segment.start.x, segment.start.y);
        ctx.lineTo(segment.end.x, segment.end.y);
        ctx.moveTo(segment.end.x, segment.end.y);
        ctx.stroke();
    };

    var undoLastSegment = function() {
        clearBoard();
        //segments.pop();
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
            // TODO: set correct color in drawSegment
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
        mouseDown = true;
    });

    $board.mouseup(function() {
        mouseDown = false;
        curSegment = {};
    });

    $board.mousemove(function(event) {
        var pos;

        if (mouseDown) {
            // Record segment
            pos = mousePos.call(this, event);
            if ('start' in curSegment) {
                curSegment.end = pos;
                segments.push(curSegment);
                drawSegment(curSegment);
            }
            curSegment.start = pos;
            curSegment.rgb = ctx.strokeStyle;
        }
    });

});
