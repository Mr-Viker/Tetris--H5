/**
 * Created by Viker on 2016/8/24.
 */




(function(window) {
    'use strict';


    // 设置共有10个级别，用自执行函数来生成每个级别所需的最低分数
    var levelArr = (function() {
        var arr = [0];
        for(var i =1; i<=10; i++) {
            arr.push(i*i * 100);
        }
        return arr;
    })();

    function Level() {
        this.canvas = new Canvas('level-canvas', 100, 70);
        this.level = 1;

        this._init();
    }


    Level.prototype = {
        constructor: Level,
        _init: function() {
            this._render();
        },
        _render: function() {
            this.canvas.drawText('Level ' + this.level);
        },
        checkLevel: function(score) {
            if(score >= levelArr[this.level]) {
                this.level++;
                this._render();
                return this.level;
            }
            return 0;
        }
    };


    window.Level = Level;

})(window);
 
