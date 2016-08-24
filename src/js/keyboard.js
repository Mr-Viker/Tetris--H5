/**
 * Created by Viker on 2016/8/23.
 */




(function(window) {
    'use strict';


    var keys = {
        37: 'left',
        38: 'top',
        39: 'right',
        40: 'down'
    };

    function Keyboard(board) {
        this.board = board;
    }


    Keyboard.prototype = {
        constructor: Keyboard,
        init: function() {
            var self = this;
            document.addEventListener('keydown', function(ev) {
                self.onKeyDown(ev);
            });
        },
        onKeyDown: function(ev) {
            if(this.board.state !== "play") {
                return;
            }
            if(keys[ev.keyCode]) {
                var toRefresh = false;
                switch(keys[ev.keyCode]) {
                    case 'left':
                        if(this.board.validMove(-1, 0)) {
                            this.board.shape.x -= 1;
                            toRefresh = true;
                        }
                        break;
                    case 'top':
                        this.board.shape.rotate();
                        toRefresh = true;
                        break;
                    case 'right':
                        if(this.board.validMove(1, 0)) {
                            this.board.shape.x += 1;
                            toRefresh = true;
                        }
                        break;
                    case 'down':
                        for(var i = TetrisConfig.rows; i>0; i--) {
                            if(this.board.validMove(0, i)) {
                                this.board.shape.y += i;
                                toRefresh = true;
                            }

                        }
                        break;
                }
                if(toRefresh) {
                    this.board.refresh();
                }
            }
        }

    };


    window.Keyboard = Keyboard;

})(window);
 
