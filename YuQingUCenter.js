


//舆情大师 主体
function app(config){
    var that=this,
    mods;
    this.menu;
    //  所有模块
    this.modules=[];
    // 最小高度
    this.minH=600;
    // 所有弹层
    this.modal={};
    // 初始化
    this.init=function(){
        initMenu();
        this.modal=new init_modal();
        initBind();
        initModule(config);
        freshH();
    };

    this.fresh=function(){
        freshH();
    };

    // 切换菜单
    this.changeMenu=function(m1,m2){
        var item;
        menu.removeClass("active");
        if(m1&&m1>0){
            item=menu.eq(m1-1).find(".menu-item");
            menu.eq(m1-1).addClass("active");
        }
        if(m2&&m2>0){
            item.removeClass("active").eq(m2-1).addClass("active");
        }
    }

    this.changePayState=function(isSucess){
        var menu=$(".module.package .module-warp .title>span"),
        block=$(".module.package .content .paying"),
        suc=$(".module.package .content .win");
        if(isSucess){
            menu.addClass("active");
            block.hide();
            suc.show();
        }else{
            menu.removeClass("active").eq(0).addClass("active");
            block.show();
            suc.hide(); 
        }
    }

    // 切换module
    this.changeModule=function(filter,changeUrl){
        var m;
        if(!filter){
            return;
        }
        if(filter){
            $.each(that.modules,function(){
                if(this.selector==filter){
                    m=this;
                }
            });
        }else{
            m=that.modules[0];
        }
        that.changeMenu(m.menu_1,m.menu_2);
        mods.removeClass("active");
        m.dom.addClass("active");
        if(filter=="package"){
            var isSuccess=GetQS("trade_status");
            that.changePayState(isSuccess=="TRADE_SUCCESS");
        }
        if(changeUrl){
            window.location.hash=m.selector;
        }
        if(typeof m.onLoad=="function"){
            m.onLoad(m.dom,that.modal);
        }
    }

    // 初始化菜单
    function initMenu(){
        menu=$(".at-menu .menu-group");
        menu.on("click",".title",function(){
            menu.removeClass("active");
            $(this).parent(".menu-group").addClass("active");
        })
        menu.on("click",".menu-item",function(){
            menu.find(".menu-item").removeClass("active");
            $(this).addClass("active");
        });

    }

    // 刷新主高度
    function freshH(){
        var 
        wh=$(window).height(),
        ab=$(".module.active .flex-height");
        ab.height("auto");
        var abh=ab.outerHeight(),
        ah=$(".app").height();
        if(wh<=that.minH){
            wh=that.minH;
        }
        if(ah<=wh){
            ab.outerHeight(abh + wh-ah);
        }

        am.height(wh - fh); 
        var mh1=$(".app-modules >.module").eq(0).height();
        $(".module-warp").each(function(){
            var that=$(this),
            tdoms=that.children(),
            fdom=tdoms.filter(".flex-height"),
            ndoms=tdoms.not(".flex-height");
            
            var vh0=0;
            ndoms.each(function(){
                vh0+=$(this).outerHeight(true);
            });
            fdom.outerHeight(mh1-vh0);
        }); 
        $(".flex-height").mCustomScrollbar("update");


    }

    // 初始化绑定事件
    function initBind(){
         $(".flex-height").mCustomScrollbar({
            theme:"com",
         callbacks:{ }
     });
    }

    // 初始化modules
    function initModule(obj){
        mods=$(".module");
        $.each(obj,function(){
            this.dom=mods.filter("."+this.selector);
            var menu=this.menu.split("-");
            if(menu){
                this.menu_1=parseInt(menu[0]);
                if(menu.length>1){
                    this.menu_2=parseInt(menu[1]);
                }else{
                    this.menu_2=-1;
                }
            }
            that.modules.push(this);
        });
        that.changeModule(window.location.hash.replace("#","").split("?")[0]);
        $(document).on("click",".module-link[data-modulename]",function(){
            var name=$(this).data("modulename");
            that.changeModule(name,1);
        });
    }


    //初始化select
    function init_sel() {
        var sel = $(".dpSelect");
        if (!sel || sel.length <= 0) {
            return;
        }
        sel.each(function () {
            var that = $(this),
                text = that.find(".text"),
                list = that.find(".hd-block"),
                input = that.find(".value");
            text.on("click", function () {
                that.toggleClass("active");
            });

            list.on("click", ".item", function () {
                var dom = $(this);
                text.find(">span").text(dom.text());
                input.val(dom.data("val"));
                that.removeClass("active");
            });

        $(document).on("click", function (e) {
            var target = $(e.toElement || e.target).closest(".dpSelect");
            if (target.length <= 0 || !target.is(that)) {
                that.removeClass("active");
                }
            });
        });
    }


    //初始化弹层
    var init_modal=function(){
        this.ChangePhone=get_modal("m-edit-phone");
        this.EditPw=get_modal("m-edit-password");
        this.ResetEm=get_modal("m-edit-email");
        this.Login=get_modal("m-login");
        this.Register=get_modal("m-register");
        this.Exit=get_modal("m-exit");
        this.Confirm=get_modal("m-confirm");
        this.KeyWords=get_modal("m-add-keyWords");
        this.List=get_modal("m-monitor-list");
        this.Loading=get_modal("m-loading");
        this.QCode=get_modal("m-qcode");
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
        change_step();
    }

    // 弹层切换步骤
    function change_step(){
        var menu=$(".page-step");
        if(menu&&menu.length){
            menu.each(function(){
                var that=$(this);
                var blocks=that.siblings(".changed-block");
                blocks.find(".step-next").on("click",function(){
                    that.find(".item.active").next().addClass("active");
                    blocks.filter(".active").next().addClass("active").prev().removeClass("active");
                });
            });
        }
    }

    /*表单错误显示*/
    function input_error_show(dom,text){
        if(dom.length<=0)return;
        var err_tip=dom.siblings(".error-info");
        if(err_tip.length<=0){
            err_tip=$('<div class="error-info"></div>');
            dom.after(err_tip);
        }
        err_tip.html('<i class="iconfont">&#xe630;</i>'+text);
        dom.addClass("error");
    }
    /*表单错误取消*/
    function input_error_hide(dom,text){
        if(dom.length<=0)return;
        dom.removeClass("error");
    }

    /*成功tips提示*/
    this.tipSuccess=function(text,time){
        if(!time){
            time=2000
        }
        var html=$('<div class="uc-success-tip"><h6><i class="iconfont">&#xe71e;</i><span>' +
            text +
            '</span></h6></div>');
        $("body").append(html);
        setTimeout(function(){
            html.addClass("active");
            setTimeout(function(){
                html.removeClass("active");
                setTimeout(function(){
                    html.remove();
                },300);
            },time);
        },50);
    }

}


$(function(){
    var modules=
        [
            {
                name:"信息列表",
                selector:"info-list",
                dom:{},
                menu:"1-1",
                onLoad:function(module,modal){
                    YQ.fresh();
                    info_list(1);

                }
            },
            {
                name:"定向监测",
                selector:"dir-monitor",
                dom:{},
                menu:"1-2",
                onLoad:function(module,modal){
                    YQ.fresh();
                    user_source_list(1,'');
                    source_list(1);
                }
            },
            {
                name:"预警日报",
                selector:"report",
                dom:{},
                menu:"1-3",
                onLoad:function(module,modal){
                    YQ.fresh();
                    report_list(1);
                }
            },
            {
                name:"套餐",
                selector:"package",
                dom:{},
                menu:"2",
                onLoad:function(module,modal){
                    YQ.fresh();
                    package_index();
                }
            },
            {
                name:"账号管理",
                selector:"account",
                dom:{},
                menu:"3-1",
                onLoad:function(module,modal){
                    YQ.fresh();
                    
                }
            },
            {
                name:"我要充值",
                selector:"charge",
                dom:{},
                menu:"3-2",
                onLoad:function(module,modal){
                    YQ.fresh();
                    package_index(); 
                }
            },
            {
                name:"充值记录",
                selector:"record",
                dom:{},
                menu:"3-2",
                onLoad:function(module,modal){
                    YQ.fresh();
                    order_list(1);  
                }
            },
            {
                name:"我的收藏",
                selector:"favorite",
                dom:{},
                menu:"3-3",
                onLoad:function(module,modal){
                    YQ.fresh();
                    favorite_list(1);
                }
            }
        ];
   window.YQ=new app(modules);

   YQ.init();
   

    //绑定基本弹层    
   $(".tab .del").on("click",function(){
       YQ.modal.Confirm()
   });
   $(".change-phone").on("click",function(){
        YQ.modal.ChangePhone()
    }); 
    $(".change-email").on("click",function(){
        YQ.modal.ResetEm()
    }); 
    $(".change-pw").on("click",function(){
        YQ.modal.EditPw()
    });
    $(document).on("click",".btn-kw-add",function(){
        YQ.modal.KeyWords();
    });
    $(".btn-net-list").on("click",function(){
        YQ.modal.List();
    });

    //刷新二维码弹层
    $(".m-qcode .modal-main img").on("load",function(){
        YQ.modal.QCode("fresh");
    })

    // 副关键词长度显示
    var temp=$(".m-add-keyWords").find(".word-tip");
    $(".m-add-keyWords").find(".textarea").on("keyup",function(){
       var l=$(this).val().length;
       temp.text(l+"/50");
    });

    add_and_reduce();
    
    // 购买方式切换
    $(document).on("click",".paying .pay-way",function(){
        $(this).addClass("active").siblings(".pay-way").removeClass("active");
    });
    
    // 数字选择
    function add_and_reduce() {
      $(document).on("click",".paying .reduce",function() {
         var a = parseInt($(this).siblings(".pay_num").val());
         if (a <= 1) {
           $(this).siblings(".pay_num").val(1);
           $(this).addClass("no");
         }else {
           a -= 1;
            $(this).siblings(".pay_num").val(a);
         }
          // 后端添加
          var money = $('.package .package-name').data('money');
          $('#package-money').text('￥'+parseInt(a) * parseInt(money));
      });
    
      $(document).on("click",".paying .add",function() {
        var a = parseInt($(this).siblings(".pay_num").val());
          a += 1;
          $(this).siblings(".pay_num").val(a);
          $(this).siblings(".reduce").removeClass("no");
          // 后端添加
          var money = $('.package .package-name').data('money');
          $('#package-money').text('￥'+parseInt(a) * parseInt(money));
      });
    }

    // 表格 修改email
    $(document).on("click",".tab .email-btn",function(){
        $(this).parents(".email-block ").addClass("inedit");
    });

    //取消
    $(document).on("click",".tab .add-e-cancel",function(){
        $(this).parents(".email-block").removeClass("inedit");
    });

    //我的收藏  取消收藏
    $(document).on("click",".collection .item  .coll-btn ",function(){
        $(this).closest(".item").remove();
        $(".mouse_tip").hide();
        // todo 删除收藏
    });


    // 监测时间  信息排序
    $('.monitor-time').on('click',function () {
        $(this).siblings('.monitor-time').removeClass('active');
        $(this).addClass('active');
    });
    $('.monitor-sort').on('click',function () {
        $(this).siblings('.monitor-sort').removeClass('active');
        $(this).addClass('active');
    });

});



function GetQS(name){
    var s=location.href.substr(location.href.indexOf("?")+1),
    qs=[];
    var hl=s.indexOf("#");
    if(hl>0){
        s=s.substring(0,hl);
    }
    var arr=s.split("&");
    for(var i=0;i < arr.length;i++){ 
        num=arr[i].indexOf("="); 
        if(num>0){ 
            var n=arr[i].substring(0,num);
            if(name==n){
                return arr[i].substr(num+1);
            }
        } 
    }
    return null;
}
