/**
 * Created by Viker on 2016/8/24.
 */



(function(window) {
    'use strict';


    function Timer() {
        this.canvas = new Canvas('timer-canvas', 100, 70);
        this.time = 0;
        this.timerId; //定时器ID

        this._init();
    }


    Timer.prototype = {
        constructor: Timer,
        _init: function() {
            this._render();
            this.resume();
        },
        _format: function(time) {
            var hour = Math.floor(time / (60 * 60));
            var minute = Math.floor(time / 60 % 60);
            var second = Math.floor(time % 60);
            hour = this._checkTime(hour);
            minute = this._checkTime(minute);
            second = this._checkTime(second);

            return hour + ':' + minute + ':' + second;
        },
        _checkTime: function(time) {
            return time >= 10 ? time : '0' + time;
        },
        _render: function() {
            this.canvas.drawText(this._format(this.time));
        },
        pause: function() {
            clearInterval(this.timerId);
        },
        resume: function() {
            var self = this;
            this.timerId = setInterval(function() {
                self.time += 1;
                self._render();
            }, 1000);
        },
        stop: function() {
            this.pause();
        }
    };


    window.Timer = Timer;

})(window);
