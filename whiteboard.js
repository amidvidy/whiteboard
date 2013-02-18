// This code isn't going to be pretty. Just trying to get a feel for the html5 canvas API.
$(document).ready(function() {

    // Whiteboard constructor
    var Whiteboard = function(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.history = [];

        this.lineColor = '#000000'
        this.lineWidth = 3.0;
    };

    Whiteboard.prototype.resetBoard = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Whiteboard.prototype.redraw = function() {
        // Draw all the segments!
        this.resetBoard();
        for (var i = 1; i < this.history.length; i++) {
            this.drawSegment(this.history[i-1], this.history[i])
        }
    };

    Whiteboard.prototype.drawSegment = function(start, end) {
        this.ctx.beginPath();
        this.ctx.lineWidth = start.lineWidth;
        this.ctx.strokeStyle = start.lineColor;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y)
        this.ctx.closePath();
        this.ctx.stroke();
    };

    Whiteboard.prototype.addSegment = function(event) {
        event.lineColor = this.lineColor;
        event.lineWidth = this.lineWidth;

        this.history.push(event)
        this.redraw();
    };

    Whiteboard.prototype.setLineWidth = function(width) {
        this.lineWidth = width;
    };

    Whiteboard.prototype.setLineColor = function(colorCode) {
        this.lineColor = colorCode;
    };

    // Initialize canvas
    var board = document.getElementById("board");
    //var ctx = board.getContext("2d");
    var wb = new Whiteboard(document.getElementById("board"));

    // Initialize jQuery objects
    var $board = $(board);
    var $colorPicker = $("#colorPicker");
    var $widthPicker = $("#widthPicker");
    var $resetButton = $("#resetButton");
    var $undoButton = $("#undoButton");

    // Initialize state
    var mouseDown = false;

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
            wb.setLineColor(color.toHexString());
        }
    });

    // width picking
    $widthPicker.change(function() {
        wb.setLineWidth($(this).val());
    });

    // undo button
    $undoButton.click(function() {
        //undoLastSegment();
        // no op
    });

    // reset button
    $resetButton.click(function() {
        wb.resetBoard();
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
            wb.addSegment(pos);
        }
    });

});
