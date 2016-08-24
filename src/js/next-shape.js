/**
 * Created by Viker on 2016/8/24.
 */




(function(window) {
    'use strict';

    function NextShape() {
        this.canvas = new Canvas('next-canvas', 100, 70);
        
        this._init();
    }


    NextShape.prototype = {
        constructor: NextShape,
        _init: function() {
            this.rows = 6;
            this.cols = 4;
        },
        render: function(shape) {
            this.canvas.clear();
            shape.draw(this.canvas.context, 16);
        }
    };


    window.NextShape = NextShape;

})(window);

