(function () {

var ie = (function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

var template = '<div class="title">提示</div>\n  <div class="browser-check-body">\n  <p>\n    {name} 不支持您当前使用的浏览器，请使用以下浏览器\n  </p>\n  <ul>\n    <li>\n      <a target="_blank" href="http://www.google.com/chrome/index.html?hl=zh_cn&brand=CHMA&utm_campaign=zh_cn&utm_source=zh_cn-ha-apac-zh_cn-bk&utm_medium=ha">\n      <img src="https://i.alipayobjects.com/e/201210/1W6Fh192H6.jpg" alt="" />\n      <span>Chrome</span>\n      </a>\n    </li>\n    <li>\n      <a target="_blank" href="http://firefox.com.cn/">\n      <img src="https://i.alipayobjects.com/e/201210/1W6FH63eku.jpg" alt="" />\n      <span>Firefox</span>\n      </a>\n    </li>\n    <li>\n      <a target="_blank" href="http://www.apple.com.cn/safari/">\n        <img src="https://i.alipayobjects.com/e/201207/35EupGflAf.jpg" alt="" />\n        <span>Safari</span>\n      </a>\n    </li>\n  </ul>\n  </div>\n';

function position () {
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      x: x,
      y: y
    }
}

function showDialog (name) {
  if (ie) return false;
  var html = template.replace(/\{name\}/g, name);
  var el = document.createElement('div');
  el.className = 'browser-check';
  el.innerHTML = html;
  document.body.appendChild(el);
  var modal = document.createElement('div');
  modal.className = 'browser-check-modal';
  var p = position();
  document.body.appendChild(modal);
  modal.style.height = p.y + 'px';
  modal.style.width = p.x + 'px';
  return true;
}

if (typeof module !== "undefined" && typeof exports !== "undefined") {
  module.exports = showDialog;
} else {
  window.showBrowsersDialog = showDialog;
}
})();
