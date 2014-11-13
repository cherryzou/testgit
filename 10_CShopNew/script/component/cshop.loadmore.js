/**
 * @desc  加载更多组件控制
 * @function   
 *        控件生成dom，自动加入容器里；控件被点击或懒加载时，抛出事件通知容器，由容器启动数据刷新。刷新完毕后回调控件。更新本身状态
 * @example   new MTS.LoadMore({
 * 						after: '.ticket-list', //控件加到这dom后面，支持字符串，dom等
 * 						before: ''
 * 						},  //此参数可以直接传dom/字符串，会将控件加入dom里; 若为undefined，会加入body
 * 						type			//触发类型  1 点击，默认可不传  2懒加载（还未支持） ,
 * 					    click:  点击加载更多时触发  //如果click是json，取{click：  context}	会切换域context执行。
 * 					)
 * @ps _私有方法
 */
(function(w,M){
    /**
     * 滑动对象
     */
    M.LoadMore = function(options){
        function LoadMore(options){
            //默认参数  容器dom，前置dom
            var ops = this.options = options || {};
            this.type = ops.type || 1;
            this.textDom = '';
            this.text1 = '点击加载更多';

            this.click = ops.click || function(){};
            this.before = ops.before && $(ops.before);
            this.after =  ops.after && $(ops.after);
            this.container = $(ops.container || 'body');

            this.init();
            this.initEvent();
            this.render();
        };
        LoadMore.prototype = {
            TPL: '<div class="load-more-lay" id="loadingMore" extd="10"><a href="javascript:void(0)">点击加载更多</a></div>',
            TPL_LOAD: [
                '<div class="sn-html5-loading fixedLoading" style="display: none">',
                '<span class="blueball"></span>',
                '<span class="orangeball"></span>',
                '</div>'
            ].join(''),
            CLASS_NAME: 'LoadMore',

            init: function(){
                //init dom
                this.dom = $(this.TPL + this.TPL_LOAD);
                this.textDom = this.dom.find('a');
            },

            /**
             * 初始化事件
             */
            initEvent: function(){
                var _this = this;

                //支持两种监听模式： 1点击，0懒加载
                !!this.type ? this._clickListener() : this._lazyLoadListener();
            },

            render: function(){
                //加入容器
                if(this.before){
                    this.dom.insertBefore(this.before);
                }else if(this.after){
                    this.dom.insertAfter(this.after);
                }else if (this.container){
                    this.container.append(this.dom)
                }

                return this.dom;
            },

            /**
             * 点击监听
             */
            _clickListener: function(){
                var _this = this;
                this.dom.on('click', function(e){
                    //切换本身状态，显示球形dom，隐藏原有加载更多dom
                    _this._toggleStaus(1);

                    //触发click事件
                    _this.click(e);

                    return !1;
                })
            },
            _lazyLoadListener: function(){},

            /**
             * 切换状态 0-1自动切换，设值则取设的值
             * 0:展示显示更多  1：加载中  2，隐藏全部
             */
            _toggleStaus: function(flag){
                if (this.dom.size() != 2) return false;

                switch(flag){
                    case  0:
                        $(this.dom[1]).hide();
                        $(this.dom[0]).show();
                        break;
                    case 1:
                        $(this.dom[0]).hide();
                        $(this.dom[1]).show();
                        break;
                    case 2:
                    default:
                        $(this.dom[0]).hide();
                        $(this.dom[1]).hide();
                }
            },

            /**
             * 切换loadmore状态
             * @param showFlag
             *  flag  控制删除还是隐藏
             */
            flush: function(showFlag){
                //控制本身显示或隐藏
                if (showFlag){
                    this._toggleStaus(0);
                }else{
                    this._toggleStaus(2);
                }

            },

            destroy: function(){
                this.dom.remove();
            },

            hide: function(){
                this.dom.hide();
            },

            show: function(){
                this.dom.show();
            }
        }
        return new LoadMore(options);
    }
})(window,  window.CShop = window.CShop || {});
