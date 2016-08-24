/**
 * Created by Viker on 2016/8/24.
 */




(function(window) {
    'use strict';


    function HighScore() {
        this.canvas = new Canvas('high-canvas', 100, 70);
        this.highScore = 0;

        this._init();
    }


    HighScore.prototype = {
        constructor: HighScore,
        _init: function() {
            this.highScore = this._getScore();
            this._render();
        },
        _render: function() {
            this.canvas.drawText(this.highScore);
        },
        checkScore: function(score) {
            if(score > this.highScore) {
                this.highScore = score;
                this._render();
                this._setScore(this.highScore);
            }
        },
        _setScore: function(value) {
            window.localStorage.setItem('high-score', value);
        },
        _getScore: function(key) {
            key = key || 'high-score';
            return window.localStorage.getItem(key) || 0;
        }
    };


    window.HighScore = HighScore;

})(window);
 
