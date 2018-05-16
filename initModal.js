function get_modal(name){
    var dom=$(".modal."+name );
    if(dom.length<=0)return;
    dom.open=function(){
        open_modal($(this));
    };
    dom.close=function(){
        close_modal($(this));
    };
    dom.fresh=function(){
        fresh_modal($(this));
    }
    dom.find(".close").on("click",function(){
        close_modal(dom);
    });
    dom.find(".cancel").on("click",function(){
        close_modal(dom);
    });
    return function(fun,callback){
        if(fun){
            if(dom.hasOwnProperty(fun)){
                if(typeof dom[fun] == "function"){
                    dom[fun]();
                }
                if(typeof(callback)=="function"){
                    callback();
                }
                return null;
            }else{
                return dom[fun];
            }
        }
        else{
            dom.open();
            if(typeof(callback)=="function"){
                callback();
            }
        }
        
    };
    function open_modal(m){
        m.show();
        setTimeout(function(){
            m.addClass("active");
            fresh_modal(m);
        },50);
    }
    function fresh_modal(m){
        var that=m.find(".modal-main");
        that.height("auto");
        var mh=that.outerHeight();
        if(mh%2!=0){
            that.outerHeight(mh+1);
        }
    }
    function close_modal(m){
        m.removeClass("active");
        setTimeout(function(){
            m.hide();
        },300);
    }
}