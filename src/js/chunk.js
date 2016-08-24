/**
 * Created by Viker on 2016/8/23.
 */



(function(window) {
    'use strict';

    /**
     * 绘制每个大方块的最小组成单位[即小方块]的操作对象
     * @param chunkType 每个小方块的类型，不同的类型代表着不同的颜色
     * @constructor
     */
    function Chunk(chunkType) {
        this.type = chunkType;
        this.size = 40; // 小方块的大小 和表格的格子大小一样
        this.originSize = 32; //图片中一个小方块的大小
        this.sprite = window.ResManager.getRes('blocks'); // 获取已加载好并缓存在cacheMap中的图片
    }


    /**
     * 绘制一个小方块的方法，
     * x：横向第几个格子开始
     * y：纵向第几个格子开始
     * @type {{constructor: Chunk, draw: Chunk.draw}}
     */
    Chunk.prototype = {
        constructor: Chunk,
        draw: function(context, x, y, type, size) {
            size = size || this.size;
            context.drawImage(this.sprite, ((type || this.type) -1) * this.originSize, 0, this.originSize, this.originSize, x * size, y * size, size, size);
        }
    };

    // 将Chunk挂载出去，类似于module.exports
    window.Chunk = Chunk;


})(window);