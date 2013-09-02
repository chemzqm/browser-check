(function () {

function getInternetExplorerVersion()
// Returns the version of Windows Internet Explorer or a -1
// (indicating the use of another browser).
{
   var rv = -1; // Return value assumes failure.
   if (navigator.appName == 'Microsoft Internet Explorer')
   {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
         rv = parseFloat( RegExp.$1 );
   }
   return rv;
}

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

/**
 * 
 * @param {String} name 应用名称
 * @param {Number} version 最低支持的ie版本
 * @return {Boolean} 如果是不能支持的ie返回true，否则返回false
 * @api public
 */
function showDialog (name, version) {
  if (!ie) return false;
  var ieVer = getInternetExplorerVersion();
  if (version && ieVer >= version) return false;
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
