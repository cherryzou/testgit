// JavaScript Document
/*cherry 13030131*/
(function(W,D,C){
    C.dialogBox=function(opts){
        function DialogBox(opts){
           this.opts=opts || {};
           this.direction= this.opts.direction || "X";
           this.dialog=this.opts.dialog || $(".first-right");
           this.closeButton=this.opts.closeButton;
           this.linked=this.opts.linked || $(".category-icon");
           this.maskLay=this.opts.maskLay || $(".mask-lay");
           this.dialogChild=this.opts.dialogChild || $(".menus-list");
           this.smallDialog=this.opts.smallDialog || $(".favorite-small-lay");
           this.smallLinks=this.opts.smallLinks || $(".favorite-text");
           this.configBtn=this.opts.configBtn || $(".config");
           this.cancelBtn=this.opts.configBtn || $(".cancel");
           this.successBox=this.opts.successBox || $(".shop-alert-box");
        }
        DialogBox.prototype={
            init:function(){
                this.setInterface();
                this.smallDialogs();
            },
            setInterface:function(){
                var that=this, heights=this.getHeight(), linked=this.linked, theHeight=Math.max(document.documentElement.scrollHeight, window.innerHeight);
                var rigW=window.innerWidth-that.dialog.width();
                var btmH=window.innerHeight-that.dialog.height();
                if(that.direction=="X"){
                    that.dialog.css({
                        "-webkit-transform":"translate("+that.dialog.width()*1+"px, 0px)"
                    });
                }
                if(that.direction=="Y"){
                    that.dialog.css({
                        "-webkit-transform":"translate(0px,"+that.dialog.height()*1.3+"px)"
                    });
                }

                linked.on("click",function(){
                   that.maskLay.show();
                   that.maskLay.height(heights.pageHeight*1.65);
                   that.dialogChild.height(heights.pageHeight*1.65-46);
                   that.dialog.css({
                       "-webkit-backface-visibility": "hidden",
                       "-webkit-transition":"-webkit-transform 0.5s",
                       "-webkit-transform-style":"preserve-3d",
                       "transition": "-webkit-transform 0.5s",
                       "-webkit-transform-origin":"0px 0px",
                       "-webkit-transform":"translate(0px, 0px)" ,
                       "z-index":12
                   });
                   if(that.direction=="X"){
                       that.dialog.css({
                            "display":"block"
                       });
                   }

                });
                that.closeButton.on("click",function(){
                    hides();
                });
               that.maskLay.on("click",function(){
                   hides();
               });
               function hides(){
                   that.maskLay.hide();
                   if(that.direction=="X"){
                       that.dialog.css({
                           "-webkit-transform":"translate("+that.dialog.width()+"px,0px)"
                       }).hide(500);
                   }
                   if(that.direction=="Y"){
                       that.dialog.css({
                           "-webkit-transform":"translate(0px, "+that.dialog.height()*1.3+"px)"
                       });
                   }
               }

            },
            smallDialogs:function(){
                var that=this, windowSizes=this.getHeight(), scrolls=this.getScroll(),
                    lefts=windowSizes.windowWidth*0.5-that.smallDialog.width()*0.5+scrolls.xScroll,
                    sucLefts= windowSizes.windowWidth*0.5-that.successBox.width()*0.5+scrolls.xScroll,
                    tops=scrolls.yScroll+(windowSizes.windowHeight/3);
                that.smallLinks.on("click",function(){
                    that.maskLay.show();
                    if(that.direction=="Y"){
                        that.dialog.css({
                            "-webkit-transform":"translate(0px, "+that.dialog.height()*1.3+"px)"
                        });
                    }
                    that.smallDialog.css({
                        left:lefts+"px",
                        top:tops+"px",
                        display:"block"
                    });
                });
                that.cancelBtn.on("click",function(){
                    that.smallDialog.hide();
                    that.maskLay.hide();
                });
                that.configBtn.on("click",function(){
                    that.successBox.show();
                    that.maskLay.hide();
                    that.smallDialog.hide();
                    that.successBox.css({
                       left:sucLefts+"px",
                       top:tops+"px"
                    });
                });
                window.setInterval(function(){
                    that.successBox.hide();
                },3000)

            },
            getHeight:function(){
                var xScroll, yScroll;
                if(window.innerHeight && window.scrollMaxY){
                    xScroll=window.innerWidth+window.scrollMaxX;
                    yScroll=window.innerHeight+window.scrollMaxY;
                }else if(document.body.scrollHeight > document.body.offsetHeight){
                    xScroll=document.body.scrollWidth;
                    yScroll=document.body.scrollHeight;
                }else{
                    xScroll=document.body.clientWidth;
                    yScroll=document.body.clientHeight;
                }
                var windowWidth, windowHeight;
                if(self.innerHeight){
                    if(document.documentElement.clientWidth){
                        windowWidth=document.documentElement.clientWidth;
                    }else{
                        windowWidth=self.innerWidth;
                    }
                    windowHeight=self.innerHeight;

                }else if(document.documentElement && document.documentElement.scrollHeight){
                    windowWidth=document.documentElement.clientWidth;
                    windowHeight=document.documentElement.clientHeight;
                }else if(document.body){
                    windowWidth=document.body.clientWidth;
                    windowHeight=document.body.clientHeight;
                }
                if(yScroll<windowHeight){
                    pageHeight=windowHeight;
                }else{
                    pageHeight=yScroll;
                }
                if(xScroll<windowWidth){
                    pageWidth=windowWidth;
                }else{
                    pageWidth=xScroll;
                }
                arrayPageSize={"pageWidth":pageWidth,"pageHeight":pageHeight,"windowWidth":windowWidth,"windowHeight":windowHeight};

                return arrayPageSize;
            },
            getScroll:function(){
                var xScroll, yScroll,arrayPageScroll={};
                if (self.pageYOffset) {
                    yScroll = self.pageYOffset;
                    xScroll = self.pageXOffset;
                } else if (document.documentElement && document.documentElement.scrollTop) {// Explorer 6 Strict
                    yScroll = document.documentElement.scrollTop;
                    xScroll = document.documentElement.scrollLeft;
                } else if (document.body) {// all other Explorers
                    yScroll = document.body.scrollTop;
                    xScroll = document.body.scrollLeft;
                }
                arrayPageScroll = {"xScroll":xScroll,"yScroll":yScroll};
                return arrayPageScroll;
            }
        }
        return new DialogBox(opts).init();
    };

    C.treeMenus=function(opts){
        function TreeMenus(opts){
           this.opts=opts || {};
           this.menus=this.opts.menus || $(".arr-control");
           this.parentCon=this.opts.parentCon || $(".controls");
           this.selected=this.opts.selected || "Selected";
           this.listItems=this.opts.listItems || ".list-items";
           this.subMeun=this.opts.subMenu || ".sub-list-menu";
        }
        TreeMenus.prototype={
            init:function(){
                this.menusControl();
            },
            menusControl:function(){
                var that=this;
                this.menus.each(function(i){
                    $(this).on("click",function(){
                        if($(this).parent(that.parentCon).next(that.subMeun).css('display')==('none')){
                            $(this).parent(that.parentCon).next(that.subMeun).show();
                            $(this).parent(that.parentCon).parent(that.listItems).addClass(that.selected);
                        }else{
                            $(this).parent(that.parentCon).next(that.subMeun).hide();
                            $(this).parent(that.parentCon).parent(that.listItems).removeClass(that.selected);
                        }
                    });
                });


            }
        }
        return new TreeMenus(opts).init();
    };
    C.scrollTop=function(opts){
        function ScrollTop(opts){
            this.opts=opts || {};
            this.topBox=this.opts.topBox || $(".back-to-top");
        }
        ScrollTop.prototype={
            init:function(){
                this.scrollTo();
            },
            scrollTo:function(){
                var that=this;
                $(window).scroll(function(){
                    document.body.scrollTop > 300 ? that.topBox.show() : that.topBox.hide();
                });
                that.topBox.on("click",function(){
                    $("html, body").animate({scrollTop:0},200);
                });
            }
        }
        new ScrollTop(opts).init();
    };
    C.bannerImage=function(opts){
        function BannerImage(opts){
            this.opts=opts || {};
            this.myImg=this.opts.myImg || $(".myImg");
            this.logoH=this.opts.logoH || $(".logo-layer-con");
            this.listLen=this.opts.listLen;
            this.slideUl=this.opts.slideUl;
            this.parentUl=this.opts.parentUl || $(".index-slide");
            this.middleCon=this.opts.middleCon || $(".top-middle-con");
        }
        BannerImage.prototype={
            init:function(){
                this.bannerSize();
            },
            bannerSize:function(){
                var len, widths,imgH,logoH,that=this;
                window.addEventListener("resize",function(){
                    size();
                });

                var size=function(){

                    len=that.listLen.size();
                    widths=$(".main-wrap").width() >=640 ? 640 : $(".main-wrap").width();
                    imgH=that.myImg.height();
                    that.slideUl.width(widths*len+"px");
                    that.parentUl.find("img").css({height:($(".main-wrap").width()/640)*220+"px"});
                    that.parentUl.css({height:($(".main-wrap").width()/640)*220+"px"});
                    that.middleCon.height(($(".main-wrap").width()/640)*354);
                    logoH=that.logoH.height(that.middleCon.height()-($(".main-wrap").width()/640)*220);
                    for(var i=0; i<len; i++){
                        that.listLen[i].style.width=widths+"px";
                    }
                };
                size();

            }
        }
        return new BannerImage(opts).init();
    };
    C.lazyLoad={
        lazyLoad:function(el){
            if(!document.querySelector(el)){return;}
            var delay = null;
            // var elBox = SN.dEach(el);
            // var arr = [];
            // var tmpImg = SN.find(elBox,"img");
            $(el).find("img").each(function(){
                var _this = $(this)[0];
                if(_this.offsetTop<window.innerHeight){
                    _this.src=this.getAttribute("lazy-src");
                    _this.className=_this.className+"bouseIn";
                    _this.setAttribute("lazy-src","finish");
                }
            });
            window.addEventListener("scroll", function(){
                delay = setTimeout(function(){
                    $(el).find("img").each(function(){
                        var _this = $(this)[0];

                        if(_this.getAttribute("lazy-src") == null){
                            return;
                        }
                        var top = _this.offsetTop;

                        var h = window.innerHeight || window.screen.height;
                        if(document.body.scrollTop > top + h || document.body.scrollTop < top - h && _this.getAttribute("lazy-src") != "finish"){

                            clearTimeout(delay);
                            return;
                        }
                        if(document.body.scrollTop > top - h && _this.getAttribute("lazy-src") != "finish"){

                            _this.src=this.getAttribute("lazy-src");
                            _this.className=_this.className+"bouseIn";
                            _this.setAttribute("lazy-src","finish");
                        }
                    })
                },300)

            }, false);
        }
    };
    C.tabMeuns=function(opts){
        function TabMeuns(opts){

        }
        TabMeuns.prototype={
            init:function(){
                this.meunsRun();
            },
            meunsRun:function(){
                $('.filter-sort-tab').on('click', 'li', function (e) {
                    var $target = $(this);

                    //已是选中状态，切换排序
                    if ($target.hasClass('selected')){
                        $target.hasClass('down') ? $target.removeClass('down').addClass('up') :
                            $target.removeClass('up').addClass('down');
                    } else {
                        //选中，切换样式
                        $target.addClass('selected').siblings().removeClass('selected');
                    }
                });

            }
        }
        return new TabMeuns().init();
    };
    C.theImgWidth=function(opts){
        function TheImgWidth(opts){
           this.opts=opts || {};
           this.img=this.opts.img;
           this.imgHeight=this.opts.imgHeight;
           this.imgWidths=this.opts.imgWidths;
        }
        TheImgWidth.prototype={
            init:function(){
                var that=this;
                this.adaptation();
                window.addEventListener("resize",function(){
                    that.adaptation();
                });
            },
            adaptation:function(){
                var imgWidth=this.img.width();
                var ratio= imgWidth/this.imgWidths;
                var imgH=(this.imgHeight)*ratio;
                this.img.height(imgH);
            }
        }
        return new TheImgWidth(opts).init();
    }

})(window,document,window.CShop =window.CShop || {});
(function(){
    CShop.scrollTop();
    CShop.treeMenus({
        menus:$(".arr-control")
    });
})();
