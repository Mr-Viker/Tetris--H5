/**
 * Created by Viker on 2016/8/23.
 */



(function(window) {
    'use strict';

    /**
     * 游戏主面板中真正绘画的函数,定义了一些绘画方法
     * @constructor
     */
    function Board(gameInst) {
        this.gameInst = gameInst;  // 获得游戏实例tetris
        this.chunkSize = 40;
        this.rows = TetrisConfig.rows;
        this.cols = TetrisConfig.cols;
        this.canvas = new Canvas('game-canvas', this.chunkSize * this.cols, this.chunkSize * this.rows);
        this.ctx = this.canvas.context;
        this.boardList = [];

        this.shape = new window.Shape(); //获取大方块的操作对象
        this._init();
    }


    /**
     * 定义了初始化绘制背景表格以及将其缓存，以及当定时器刷新时tick方法内更新方块数据
     * @type {{constructor: Board, _init: Board._init, _buildGridData: Board._buildGridData, _initGrid: Board._initGrid, tick: Board.tick}}
     */
    Board.prototype = {
        constructor: Board,
        _init: function() {
            this._buildGridData();
            this._initGrid(); // 绘制背景表格

            this.shape.draw(this.ctx); // 绘制大方块
            this._buildNextShape(); // 在[下一方块]面板上绘制下一方块
        },
        _buildNextShape: function() {
            this.nextshape = new window.Shape();
            this.nextshape.setPos(this.gameInst.nextshape.cols, this.gameInst.nextshape.rows);
            this.gameInst.nextshape.render(this.nextshape);
        },
        _buildGridData: function() {
            //定义一个用于表示每个格子的二维数组, 用于之后的边界检验
            for(var i = 0; i < this.rows; i++) {
                this.boardList[i] = [];
                for(var j = 0; j < this.cols; j++) {
                    this.boardList[i][j] = 0;
                }
            }
        },

        _initGrid: function() {
            //绘制表格数据
            this.ctx.strokeStyle = '#dcdcdc';
            this.ctx.lineWidth = 0.5;
            //绘制线条的笔迹
            for(var i=1; i<this.rows; i++) {
                this.ctx.moveTo(0, this.chunkSize * i);
                this.ctx.lineTo(this.chunkSize * this.cols, this.chunkSize * i);
            }
            for(var j=1; j<this.cols; j++) {
                this.ctx.moveTo(this.chunkSize * j, 0);
                this.ctx.lineTo(this.chunkSize * j, this.chunkSize * this.rows);
            }
            this.ctx.stroke();

            //缓存数据,提升性能 因为表格是不需要改变的，所以不需要clear之后重新绘画
            this.gridImgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        },

        tick: function() {
            //如果可以向下移动则移动，否则固定方块并下落新方块
            if(this.validMove(0, 1)) {
                this.shape.y += 1;
            } else {
                this.addShapeToBoardList();
                // 判断是否已经game over
                if(this.gameInst.state === "over") {
                    this.gameInst.endGame();
                    return;
                }
                this.refresh(); //刷新画布
                this.shape = this.nextshape; // 下落新方块
                this.shape.setPos(this.cols, this.rows, true);
                this._buildNextShape();
            }
            this.refresh(); //刷新画布
        },
        refresh: function() {
            this.canvas.clear();
            this.ctx.putImageData(this.gridImgData, 0, 0);
            this.drawChunks();
            this.clearRow();
            this.shape.draw(this.ctx);
        },
        validMove: function(moveX, moveY) {
            //验证下一步是否可以移动
            //计算下一步位置
            var nextX = this.shape.x + moveX;
            var nextY = this.shape.y + moveY;
            for(var y=0; y<this.shape.layout.length; y++) {
                for(var x=0; x<this.shape.layout[y].length; x++) {
                    if(this.shape.layout[y][x]) {
                        if(typeof this.boardList[nextY + y] === "undefined" //找不到行
                            || typeof this.boardList[nextY + y][nextX] === "undefined" // 找不到列 左
                            || typeof this.boardList[nextY + y][nextX + x] === "undefined" //找不到列 右
                            || this.boardList[nextY + y][nextX + x] // 该位置有方块
                        ) {
                            return false;
                        }
                    }
                }
            }
            return true;
        },
        addShapeToBoardList: function() {
            //判断是否需要将方块固定在表格中显示出来
            for(var y=0; y<this.shape.layout.length; y++) {
                for(var x=0; x<this.shape.layout[y].length; x++) {
                    if(this.shape.layout[y][x]) {
                        var boardX = this.shape.x + x;
                        var boardY = this.shape.y + y;
                        if(this.boardList[boardY][boardX]) {
                            //todo game over
                            this.gameInst.state = "over";
                            return;
                        } else {
                            this.boardList[boardY][boardX] = this.shape.chunk.type;
                        }
                    }
                }
            }
        },
        drawChunks: function() {
            // 当将大方块达到固定条件而固定时，要将其在刷新时也绘制出来
            for(var y=0; y<this.rows; y++) {
                for(var x=0; x<this.cols; x++) {
                    if(this.boardList[y][x]) {
                        this.shape.chunk.draw(this.ctx, x, y, this.boardList[y][x]);
                    }
                }
            }
        },
        createEmptyRow: function() {
            var emptyRow = [];
            for(var i = 0; i<this.cols; i++) {
                emptyRow.push(0);
            }
            return emptyRow;
        },
        clearRow: function() {
            var lines = 0; //消除的行数，用于计算得分
            //当一行都被填充满时消除该行的chunk
            for(var y=this.rows-1; y>0; y--) {
                var filled = this.boardList[y].filter(function(item) {
                        return item > 0;
                    }).length === this.cols;
                if(filled) {
                    this.boardList.splice(y, 1);
                    this.boardList.unshift(this.createEmptyRow());
                    lines++;
                    y++; //因为删了一行，上面一行就会掉下来替换成现在这一行，所以要y++重新计算当前行
                }
            }
            //计算得分
            var score = lines * lines * 10;
            var totalScore = this.gameInst.score.addScore(score);
            this.gameInst.highScore.checkScore(totalScore); //检查当前分数是否大于最高分
            var curLevel = this.gameInst.level.checkLevel(totalScore); //获取当前水平
            //如果升级了，则加快下落速度
            if(curLevel) {
                TetrisConfig.speed = Math.floor(TetrisConfig.constSpeed * (1 - (curLevel-1)/10));
            }
        }
    };


    window.Board = Board;

})(window);










