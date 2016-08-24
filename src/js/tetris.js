/**
 * Created by Viker on 2016/8/23.
 */



(function(window) {
    'use strict';


    var timer; //定时器

    function Tetris() {
        this.nextshape = new NextShape();
        this.board = new Board(this);
        this.timer = new Timer();
        this.score = new Score();
        this.level = new Level();
        this.highScore = new HighScore();

        this._sound = ''; //音乐播放器实例
        this.board.state = 'play';
        new Keyboard(this.board).init();
    }


    Tetris.prototype = {
        constructor: Tetris,
        _initAudio: function() {
            this._sound = new Howl({
                src: ['./audio/bg.wav'],
                loop: true,
                volume: 0.2
            });
            this._startAudio();
        },
        _startAudio: function() {
            if(window.TetrisConfig.sound) {
                this._sound.play();
            }
        },
        _startInterval: function() {
            var self = this;
            timer = setInterval(function() {
                self.board.tick();
            }, TetrisConfig.speed);
        },
        startGame: function() {
            this._startInterval();
            this._initAudio();
        },
        endGame: function() {
            // 停止播放音乐
            this._sound.stop();
            // 停止事件响应
            this.board.state = "over";
            // 停止tick
            clearInterval(timer);
            //停止计时
            this.timer.stop();
        },
        pause: function() {
            if(this.board.state === "over") {
                return;
            }
            // 暂停播放音乐
            this._sound.pause();
            // 暂停事件响应
            this.board.state = "pause";
            // 取消tick
            clearInterval(timer);
            //暂停计时
            this.timer.pause();
        },
        resume: function() {
            if(this.board.state === "over") {
                return;
            }
            this._startAudio();
            this.board.state = "play";
            this._startInterval();
            this.timer.resume();
        }
    };


    window.Tetris = Tetris;

})(window);

