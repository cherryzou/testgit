/**
 *   cShop 定制滑动组件
 */
(function(w,M){
    //TODO: 应该提供组件接口，将一些工具方法集成到接口里
    var slice = Array.prototype.slice;
    var getDom = function (id, isAll) {
        return "string" == typeof id ? (isAll ? document.querySelectorAll(id) : document.querySelector(id)) : id;
    };
    var forEach = function (array, callback) {
        for (var i = 0, len = array.length; i < len; i++) {
            callback.call(this, i, array[i]);
        }
    };
    var proxyEvent = function(handler, context){
        return function(e){
            handler.call(context, e);
      }
    };

    //slider: '#J_index_slide .slide_ul
    M.SlideTrans = function(slider, tip, options){
        function  SlideTrans(slider, tip, options){
//         this.container  =  getDom(container);
           this.slider =  getDom(slider);
           this.tip = getDom(tip, true);
           this.options =  options || {Vertical: false };
           this.count = this.tip.length;

            //坐标
            this._initX = 0;
            this._finishX = 0;
            this._startX = 0;
            this._startY = 0;

            this.init();
            this.initEvent();
            this.render();
            this.afterRender();
        };
        SlideTrans.prototype = {
            ClassName: 'SlideTrans',

            init:function(){
                this.st = Wap.SlideTrans(this.slider, this.count, this.options);

            },

            initEvent: function(){
                var that=this;
                //监听slider touch事件
                this.slider.addEventListener('touchstart', proxyEvent(this.touchStartHandler,this));
                this.slider.addEventListener('touchmove', proxyEvent(this.touchMoveHandler,this));
                this.slider.addEventListener('touchend', proxyEvent(this.touchEndHandler,this));

                //横屏、竖屏的兼容
                window.addEventListener("resize", function () {

                    that.st.Change = that.st._slider.offsetWidth / that.st._count;
                    that.st.next();

                });
                window.addEventListener("orientationchange", function () {
                    that.st.Change = that.st._slider.offsetWidth / that.st._count;
                    that.st.next();
                })
            },

            render: function(){
                var _this = this;
                this.st.onStart = function () {
                    forEach(_this.tip, function (i,o) {
                        o.className = _this.st.Index == i ? "cur" : "";
                    })
                }
            },

            touchStartHandler: function(event) {
                this._startX = event.touches[0].clientX;
                this._startY = event.touches[0].clientY;
                this._initX = this._startX;
            },

            touchMoveHandler: function(event) {
                var touches = event.touches;
                var _endX = event.touches[0].clientX;
                var _endY = event.touches[0].clientY;
                if (Math.abs(_endY - this._startY) > Math.abs(_endX - this._startX)) {
                    return;
                }
                event.preventDefault();
                this._finishX = _endX;
                var _absX = Math.abs(_endX - this._startX);
                var lastX = this.slider.style.left.replace('px', '');
                if (this._startX > _endX) {
                    this.st.stop();
                    this.slider.style.left = (parseInt(lastX) - _absX) + 'px';
                } else {
                    this.st.stop();
                    this.slider.style.left = (parseInt(lastX) + _absX) + 'px';
                }
                this._startX = _endX;
            },
            touchEndHandler: function(event) {
                if (this._finishX == 0) {
                    return;
                }
                if (this._initX > this._finishX) {
                    this.pagination(this._initX, this._finishX);
                } else if (this._initX < this._finishX) {
                    this.pagination(this._initX, this._finishX);
                }
                this._initX = 0;
                this._finishX = 0;
            },
            pagination: function(start, end) {
                if (start >= end) {
                    this.st.next();
                } else {
                    this.st.previous();
                }
            },
            afterRender: function(){
                this.st.run();
            }
        }
        return new SlideTrans(slider, tip, options);
    };
})(window,  window.CShop = window.CShop || {});

