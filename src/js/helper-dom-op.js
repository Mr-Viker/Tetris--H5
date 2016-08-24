/**
 * Created by Viker on 2016/8/23.
 *
 * 封装一些类似jQuery操作DOM的方法
 */


(function(window) {
    'use strict';


    /**
     * 将获取DOM实例封装在$()方法中
     * @param selector 要获取的DOM实例
     * @param context 该dom的上下文，更有效的查找
     * @returns {Element} 返回经过DomObj封装过的DOM实例，拥有一些封装方法
     */
    function $(selector, context) {
        return new DomObj((context || document).querySelector(selector));
    }


    /**
     * 构造函数，用于当调用$()方法时其内部新建该实例，如此才能调用其原型上的方法
     * @param dom
     * @constructor
     */
    function DomObj(dom) {
        this.dom = dom;
    }


    /**
     * get方法，之后所有的方法都需要内部调用该方法获得dom对象
     * @returns {*}
     */
    DomObj.prototype.get = function() {
        return this.dom;
    };


    /**
     * 监听事件的方法
     * @param evName
     * @param evHandler
     */
    DomObj.prototype.on = function(evName, evHandler) {
        this.get().addEventListener(evName, evHandler)
    };



    /**
     * 设置CSS的方法
     * @param key
     * @param value
     */
    DomObj.prototype.css = function(key, value) {
        this.get().style[key] = value;
    };


    // /**
    //  * 在元素内显示时间格式的文本
    //  * @param value
    //  */
    // DomObj.prototype.showTime = function(value) {
    //     var hour = Math.floor(value / (60 * 60));
    //     var minute = Math.floor(value / 60 % 60);
    //     var second = Math.floor(value % 60);
    //     hour = _checkTime(hour);
    //     minute = _checkTime(minute);
    //     second = _checkTime(second);
    //
    //     this.get().innerHTML = hour + ' : ' + minute + ' : ' + second;
    // };


    // /**
    //  * 格式化时间
    //  * @param time
    //  * @returns {string}
    //  * @private
    //  */
    // function _checkTime(time) {
    //     return time >= 10 ? time : '0' + time;
    // }


    // /**
    //  * 设置元素内html文本
    //  * @param value
    //  */
    // DomObj.prototype.html = function(value) {
    //     this.get().innerHTML = value;
    // };


    window.$ = $;

})(window);







