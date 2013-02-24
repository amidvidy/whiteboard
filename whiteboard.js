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
        this.logicalTime = 0;

        this.ctx.lineJoin = 'round';

        this.lineColor = '#000000';
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
            this.draw(this.logicalTime, ++this.logicalTime);
        }.bind(this));

        this.$canvas.mousemove(function(event) {
            if (this.isDrawing) {
                this.stateChange(mousePos(event));
                this.draw(this.logicalTime, ++this.logicalTime);
            }
        }.bind(this));

        this.$canvas.mouseup(function(event) {
            this.isDrawing = false;
            this.stateChange(mousePos(event));
            this.draw(this.logicalTime, ++this.logicalTime);
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
        this.logicalTime = 0;
        this.resetBoard();
    };

    Whiteboard.prototype.draw = function(startTime, endTime) {
        var curEvent = null,
            prevEvent = null;
        for (var time = startTime; time < endTime; time++) {
            curEvent = this.history[time];
            prevEvent = this.history[time-1];

            // kind of a hack but lets fix this later, for when startTime=0;
            if (!prevEvent) continue;

            this.ctx.beginPath();
            this.ctx.lineWidth = curEvent.width;
            this.ctx.strokeStyle = curEvent.color;
            if (prevEvent.drawing) {
                this.ctx.moveTo(prevEvent.pos.x, prevEvent.pos.y);
            } else {
                this.ctx.moveTo(curEvent.pos.x-1, curEvent.pos.y);
            }

            this.ctx.lineTo(curEvent.pos.x, curEvent.pos.y);

            this.ctx.closePath();
            this.ctx.stroke();
        }
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
