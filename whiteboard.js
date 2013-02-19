// This code isn't going to be pretty.
//Just trying to get a feel for the html5 canvas API.

// Some of the code is from here:
// http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
$(document).ready(function() {

    // Whiteboard constructor
    var Whiteboard = function(canvas) {
        this.canvas = canvas;
        this.$canvas = $(canvas);
        this.offsetLeft = this.$canvas.offset().left;
        this.offsetTop = this.$canvas.offset().top;

        this.ctx = canvas.getContext("2d");
        this.history = [];

        this.ctx.lineJoin = 'round';

        this.lineColor = '#000000'
        this.lineWidth = 3.0;

        this.isDrawing = false;

        // Helper function to calculate mouse position
        var mousePos = function(event) {
            return {
                x: event.pageX - this.offsetLeft,
                y: event.pageY - this.offsetTop
            };
        }.bind(this);

        // bind event handlers
        this.$canvas.mousedown(function(event) {
            this.isDrawing = true;
            this.stateChange(mousePos(event));
            this.redraw();
        }.bind(this));

        this.$canvas.mousemove(function(event) {
            if (this.isDrawing) {
                this.stateChange(mousePos(event));
            }
            this.redraw();
        }.bind(this));

        this.$canvas.mouseup(function(event) {
            this.isDrawing = false;
        }.bind(this));

        this.$canvas.mouseleave(function(event) {
            this.isDrawing = false;
        }.bind(this));

    };

    Whiteboard.prototype.resetBoard = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    Whiteboard.prototype.resetHistory = function() {
        this.history = [];
        this.redraw();
    };

    Whiteboard.prototype.redraw = function() {
        // Draw all the segments!
        var curEvent, prevEvent;
        this.resetBoard();
        for (var i = 1; i < this.history.length; i++) {
            curEvent = this.history[i];
            prevEvent = this.history[i-1];

            if (curEvent.isDrawing) {
                // This event was due to a mouse drag when mouse was already down
                this.drawSegment(prevEvent.pos, curEvent.pos,
                                 curEvent.color, curEvent.width);
            } else {
                // This event was due to a mouse click
                this.drawSegment({x: curEvent.pos.x-1, y: curEvent.pos.y},
                                 curEvent.pos, curEvent.color, curEvent.width);
            }
        }
    };

    Whiteboard.prototype.drawSegment = function(start, end, color, width) {
        this.ctx.beginPath();
        this.ctx.lineWidth = width;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y)
        this.ctx.closePath();
        this.ctx.stroke();
    };

    Whiteboard.prototype.stateChange = function(pos) {
        this.history.push({
            pos: pos,
            color: this.lineColor,
            width: this.lineWidth,
            drawing: this.isDrawing
        });
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
        wb.resetHistory();
    });

});
