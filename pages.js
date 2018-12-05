window._page = function(index, total, container) {
  var prev = $("<a id='prev'>上一页</a>"),
    next = $("<a id='next'>下一页</a>"),
    first = $("<a>首页</a>"),
    last = $("<a>尾页</a>"),
    item = $("<a class='page'></a>"),
    amount = 10;

  if (!container) {
    return;
  }
  if (index <= 1) {
    index = 1;
    prev.attr("disable", true);
    first.attr("disable", true);
  }
  if (index >= total) {
    index = total;
    next.attr("disable", true);
    last.attr("disable", true);
  }
  container.html("");
  var lval = Math.ceil(amount / 2),
    rval = Math.floor(amount / 2),
    start = index - lval,
    end = index + rval;
  start = start <= 1 ? 1 : start;
  end = end >= total ? total : end;
  if (end - start < amount) {
    start == 1
      ? (end += amount - end + start - 1)
      : (start -= amount - end + start - 1);
  }
  container.append(prev);
  for (var i = start; i <= end; i++) {
    var dom = item.clone();
    if (i == index) {
      dom.addClass("current");
    }
    dom.text(i);
    container.append(dom);
  }
  container.append(next);
};
