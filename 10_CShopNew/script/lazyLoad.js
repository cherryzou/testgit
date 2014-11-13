/**
 * [SNTouch depend on jQuery 1.7.2+]
 * 
 * @author 12050231
 *
 * only for android 2.2+ and ios 4.3.5+ 
 *
 */

(function(W, D, M){
    M.lazy={
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
    }


})(window, document, window.CD=window.CD||{});


