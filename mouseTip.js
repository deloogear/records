// 自定义tips
function mouse_tip(selector,tip,fix_x,fix_y){
    var dom,
        live_on=false;
    if(typeof(selector)=='string')
    {
        dom=$(selector);
        live_on=true;
    }
    if(typeof(selector)=="object")
    {
        dom=selector;
    }
    if(dom.length<=0)
        return;
    tip=tip?tip:"tip";
    fix_x=fix_x?parseInt(fix_x):10;
    fix_y=fix_y?parseInt(fix_y):10;
    var m_tip=$(".mouse_tip");
    if(m_tip.length<=0){
        m_tip=$("<div class='mouse_tip'></div>");
        $("body").append(m_tip);
    }
    if(live_on) {
        $(document).on("mousemove mouseleave", selector, function (e) {
            if (e.type == "mousemove") {
                dom_show($(this),e);
            }
            else {
                m_tip.hide();
            }
        });
        
        
    }else{
        dom.on("mousemove mouseleave", function (e) {
            if (e.type == "mousemove") {
                dom_show($(this),e);
            }
            else {
                m_tip.hide();
            }
        });
    }
    function dom_show(dom,e){
        var text=dom.data(tip),html="",
            top = $(document).scrollTop();
        if(!text)
            return;
        text=text.split("|");
        if(text.length>0){
            $.each(text,function(){
                if(this.length>0){
                    html+="<br/>"+this;
                }
            });
            html=html.replace("<br/>","");
        }
        m_tip.html(html);
        m_tip.show().css("left", e.pageX + fix_x).css("top", e.pageY - top + fix_y);
    }
}
