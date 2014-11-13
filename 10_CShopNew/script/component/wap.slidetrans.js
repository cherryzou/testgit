/**
 *   滑动组件
 *   支持：横向、纵向滑动； 特效：缓动，弹簧，碰撞等
 */
(function(w,M){
    var getDom = function (id) {
        return "string" == typeof id ? document.querySelector(id) : id;
    };

    var extend = function(destination, source) {
        for (var property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    var currentStyle = function(element){
        return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    }

    var bind = function(object, fun) {
        var args = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)));
        }
    }

    /**
     t：current time当前时间  b：beginning value初始值 c： change in value变化量  d：duration持续时间
     */
    var Tween = {
        Quart: {
            easeOut: function(t,b,c,d){
                return -c * ((t=t/d-1)*t*t*t - 1) + b;
            }
        },
        Back: {
            easeOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            }
        },
        Bounce: {
            easeOut: function(t,b,c,d){
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            }
        }
    }

    /**
     * 滑动对象
     */
    M.SlideTrans = function(slider, count, options){
        function  SlideTrans(slider, count, options){

            this._slider = getDom(slider);

//            this._container = getDom(container);
            this._timer = null;//定时器
            this._count = Math.abs(count);//切换数量
            this._target = 0;//目标值
            this._t = this._b = this._c = 0;//tween参数
            this.Index = 0;//当前索引
            this.options = extend(this.options, options || {});

            this.Auto = !!this.options.Auto;
            this.Duration = Math.abs(this.options.Duration);
            this.Time = Math.abs(this.options.Time);
            this.Pause = Math.abs(this.options.Pause);
            this.Tween = this.options.Tween;
            this.onStart = this.options.onStart;
            this.onFinish = this.options.onFinish;
            this.init();
        }
        SlideTrans.prototype = {
            options: {
                Vertical:	true,//是否垂直方向（方向不能改）
                Auto:		true,//是否自动
                Change:		0,//改变量
                Duration:	50,//滑动持续时间
                Time:		10,//滑动延时
                Pause:		4000,//停顿时间(Auto为true时有效)
                onStart:	function(){},//开始转换时执行
                onFinish:	function(){},//完成转换时执行
                Tween:		Tween.Quart.easeOut//tween算子
            },
            init: function() {
                var bVertical = !!this.options.Vertical;
                this._css = bVertical ? "top" : "left";//方向

                //样式设置
//                var p = currentStyle(this._container).position;
//                p == "relative" || p == "absolute" || (this._container.style.position = "relative");
//                this._slider.style.position = "absolute";

                this.Change = this.options.Change ? this.options.Change :
                    this._slider[bVertical ? "offsetHeight" : "offsetWidth"] / this._count;
            },

            //开始切换
            run: function(index) {
                //修正index
                index == undefined && (index = this.Index);
                index < 0 && (index = this._count - 1) || index >= this._count && (index = 0);
                //设置参数
                this._target = -Math.abs(this.Change) * (this.Index = index);
                this._t = 0;
                this._b = parseInt(currentStyle(this._slider)[this.options.Vertical ? "top" : "left"]);
                this._c = this._target - this._b;

                this.onStart();
                this.move();
            },
            //移动
            move: function() {
                clearTimeout(this._timer);
                //未到达目标继续移动否则进行下一次滑动
                if (this._c && this._t < this.Duration) {
                    this.moveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                    this._timer = setTimeout(bind(this, this.move), this.Time);
                }else{
                    this.moveTo(this._target);
                    this.Auto && (this._timer = setTimeout(bind(this, this.next), this.Pause));
                }
            },
            //移动到
            moveTo: function(i) {
                this._slider.style[this._css] = i + "px";
            },
            //下一个
            next: function() {
                this.run(++this.Index);
            },
            //上一个
            previous: function() {
                this.run(--this.Index);
            },
            //停止
            stop: function() {
                clearTimeout(this._timer); this.moveTo(this._target);
            }
        }
        return new SlideTrans(slider, count, options);
    }
})(window,  window.Wap = window.Wap || {});
