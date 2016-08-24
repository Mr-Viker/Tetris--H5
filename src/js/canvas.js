/**
 * Created by Viker on 2016/8/23.
 */



(function(window) {
    'use strict';

    /**
     * Canvas构造函数，提供了绘画工具
     * @param id Canvas元素的Id属性
     * @param width
     * @param height
     * @constructor
     */
    function Canvas(id, width, height) {
        this.id = id;
        this.el = document.getElementById(this.id);
        if(!this.el) {
            throw new Error('请提供一个正确的ID');
        }
        this.context = this.el.getContext('2d');
        this.width = width || window.innerWidth;
        this.height = height || window.innerHeight;

        this._init();
    }


    /**
     * Canvas原型对象
     * @type {{constructor: Canvas, _init: Canvas._init}}
     */
    Canvas.prototype = {
        constructor: Canvas,
        _init: function() {
            this.el.width = this.width;
            this.el.height = this.height;
        },
        clear: function(fromX, fromY, toX, toY) {
            fromX = fromX || 0;
            fromY = fromY || 0;
            toX = toX || this.width;
            toY = toY || this.height;
            this.context.clearRect(fromX, fromY, toX, toY);
        },
        drawText: function(text, x, y) {
            this.clear(0,0);
            this.context.font = "25px 'Arial'";
            this.context.fillStyle = "#f5f5f5";
            this.context.textAlign = "center";
            this.context.fillText(text, x !== undefined ? x : (this.width / 2), y !== undefined ? y : 45);
        }
    };


    window.Canvas = Canvas;

})(window);














