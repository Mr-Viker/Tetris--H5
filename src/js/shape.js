/**
 * Created by Viker on 2016/8/23.
 */



(function(window) {
    'use strict';


    var colorSum = 7; //小方块颜色种类数
    //该大方块对应的布局
    var layouts = [
        [[0, 1, 0], [1, 1, 1]],
        [[1,1,1,1]],
        [[1,1],[1,1]],
        [[0,1],[1,1],[1,0]],
        [[1,0],[1,1],[0,1]],
        [[1,0,1],[1,1,1]],
        [[0,1],[1,1]],
        [[1,1]],
        [[1,1],[1,0],[1,0]],
        [[1,1],[0,1],[0,1]]
    ];


    /**
     * 绘制每个大方块的绘制对象，内部会调用Chunk来绘制每个小方块
     * @constructor
     */
    function Shape() {
        this.x = 0; //起始横坐标
        this.y = 0; // 起始纵坐标
        this.chunk = new Chunk(this.random(1, colorSum));

        this.layout = layouts[this.random(0, layouts.length)];
    }


    Shape.prototype = {
        constructor: Shape,
        draw: function(ctx, size) {
            for(var i=0; i<this.layout.length; i++) {
                for(var j=0; j<this.layout[i].length; j++) {
                    if(this.layout[i][j]) {
                        this.chunk.draw(ctx, this.x + j, this.y + i, undefined, size);
                    }
                }
            }
        },
        random: function(min, max) {
            return min + Math.floor(Math.random() * max);
        },
        rotate: function() {
            var newLayout = [];
            for(var i = 0; i<this.layout[0].length; i++) {
                newLayout[i] = [];
                for(var j = 0; j<this.layout.length; j++) {
                    newLayout[i][j] = this.layout[this.layout.length-1-j][i];
                }
            }
            this.layout = newLayout;
            this._setLayout();
        },
        _setLayout: function() {
            //判断翻转之后是否超出边界，如果超出，则往中间
            if(this.x<0) {
                this.x = 0;
            }
            if(this.y<0) {
                this.y = 0;
            }
            if(this.x + this.layout[0].length > TetrisConfig.cols) {
                this.x = TetrisConfig.cols - this.layout[0].length;
            }
            if(this.y + this.layout.length > TetrisConfig.rows) {
                this.y = TetrisConfig.rows - this.layout.length;
            }
        },
        setPos: function(cols, rows, ignoreRows) {
            this.x = Math.floor((cols - this._getMaxCols()) / 2);
            if(!ignoreRows) {
                this.y = Math.floor((rows - this._getMaxRows()) / 2);
            }
        },
        _getMaxCols: function() {
            var max = 0;
            for(var y=0; y<this.layout.length; y++) {
                max = Math.max(max, this.layout[y].length);
            }
            return max;
        },
        _getMaxRows: function() {
            return this.layout.length;
        }
    };


    window.Shape = Shape;

})(window);
 
