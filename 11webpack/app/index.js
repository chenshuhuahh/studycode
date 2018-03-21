//方法一
// define(["./app.js"],function (str) {
//     document.body.innerHTML = "<div>welcome use webpack</div><div>"+str+"</div>";
// });
// 方法二：
var str = require('./app');

// require("style-loader!css-loader!./css/reset.css");
// require("style-loader!css-loader!./css/style.css");

require("./css/reset");
require("./css/style");
document.body.innerHTML = "<div>welcome use webpack</div><div>"+str+"</div>";



