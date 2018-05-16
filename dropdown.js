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
