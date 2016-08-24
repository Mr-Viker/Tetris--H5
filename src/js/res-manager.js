/**
 * Created by Viker on 2016/8/23.
 *
 * 资源加载管理器
 */



(function(window) {
    'use strict';


    var cacheMap = new Map(); // 用于存储资源的Map对象

    var resTotalNum = 1; //资源总数量

    var curLoad = 0; //当前加载的资源数量

    /**
     * 初始化加载资源
     */
    var init = function() {
        var img = new Image();
        img.src = './img/blocks.png'; //加载图片
        img.onload = function() {
            //加载完成后存入cacheMap
            cacheMap.set('blocks', img);
            curLoad++;
            //当加载完全部资源后调用回调
            if(curLoad === resTotalNum && typeof window.ResManager.onResLoaded === "function") {
                window.ResManager.onResLoaded();
            }
        };
    };

    /**
     * 通过key获取value(资源)
     * @param key
     */
    var getRes = function(key) {
        return cacheMap.get(key);
    };


    window.ResManager = {
        getRes: getRes,
        init: init,
        onResLoaded: null // 资源加载完成回调
    };

})(window);