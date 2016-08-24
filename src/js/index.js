/**
 * Created by Viker on 2016/8/23.
 */



window.onload = function() {

    var gameInst; //游戏实例[Tetris实例]

    $('.start').on('click', function(ev) {
        $('.start-container').css('display', 'none');
        $('.container').css('display', 'block');
        startBoard();
    });

    $('.setter').on('click', function(ev) {
        $('.modal-dialog').css('display', 'block');
    });

    $('.set').on('click', function(ev) {
        $('.modal-dialog').css('display', 'block');
        gameInst.pause();

    });

    $('.pause').on('click', function(ev) {
        var el = ev.target;
        if(el.innerText === "暂停") {
            gameInst.pause();
            el.innerText = "继续";
        } else {
            gameInst.resume();
            el.innerText = "暂停";
        }
    });

    $('#btn-modal-close').on('click', function(ev) {
        $('.modal-dialog').css('display', 'none');
        if(gameInst && $('.pause').get().innerText === "暂停") {
            gameInst.resume();
        }
    });

    $('#cb-sound').on('change', function(ev) {
        var enable = $('#cb-sound').get().checked;
        window.TetrisConfig.sound = enable;
    });


    function startBoard() {
        ResManager.init(); //加载资源
        ResManager.onResLoaded = function() {
            gameInst = new Tetris();
            gameInst.startGame();
        };
    }


};


