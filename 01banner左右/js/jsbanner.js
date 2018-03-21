(function () {
    var banner = document.getElementById("banner"),
        bannerInner = utils.firstChild(banner),
        bannerTip = utils.children(banner, "ul")[0];
    var imgList = bannerInner.getElementsByTagName("img"),
        oLis = bannerTip.getElementsByTagName("li");
    var prev = document.getElementById("prev"),
        next = document.getElementById("next");

    // 1.实现数据绑定：ajax请求数据
    // jsonData存储我们请求过来的数据
    // count存储当前页面有几张图片，包括克隆的第一张
    var jsonData = null, count = null;
    ~function () {
        // 创建一个ajax对象
        var xhr = new XMLHttpRequest;
        // get请求 地址 同步请求(数据请求不回来，下面的代码不会再执行)
        // ?_=" + Math.random()清除get请求里面的缓存
        xhr.open("get", "json/banner.txt?_=" + Math.random(), false);
        xhr.onreadystatechange = function () {
            // /^2\d{2}$/以2开头的三位数
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            }
        };
        // 发送请求
        xhr.send(null);
    }();

    // 2.按照字符串拼接的方式绑定数据
    ~function () {
        // 1)绑定的是轮播图片区域的数据
        var str = '';
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData["img"] + '"></div>';
            }
            // 要想实现无缝滚动 就必须克隆一份第一张放到末尾
            str += '<div><img src="" trueImg="' + jsonData[0]["img"] + '"></div>';
        }
        bannerInner.innerHTML = str;
        count = jsonData.length + 1;
        utils.css(bannerInner, "width", count * 1200);

        // 2)绑定的是焦点区域的数据
        str = '';
        if (jsonData) {
            for (i = 0, len = jsonData.length; i < len; i++) {
                i == 0 ? str += '<li class="active"></li>' : str += '<li></li>';
            }
        }
        bannerTip.innerHTML = str;
        utils.css(bannerTip, "right", 600 - (jsonData.length * 20) / 2);
    }();

    // 3.实现图片延迟加载
    // 首先给每一个img拿div包起来，给这个div有个默认的图加位
    // 当图片加载成功，才把图片显示出来，默认img隐藏
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image();
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null;
                    zhufengAnimate(curImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }

    // 4.实现自动轮播
    // 第1张step=0 2000毫秒 step= 1 运动到-1200
    // 第2张step=1 2000毫秒 step= 2 运动到-2400
    var step = 0;//记录的是步长（当前是哪一张图片，0是第一张）
    var interval = 2000;
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        // 当到达最后一张克隆的图片，立马让left值变成为0
        if (step == jsonData.length) {
            step = 0;
            utils.css(bannerInner, "left", 0);
        }
        step++;
        zhufengAnimate(bannerInner, {left: -step * 1200}, 500);
        changeTip();
    }

    // 5.实现焦点对齐
    function changeTip() {
        // 当到达最后一张克隆的图片，让步长的值变成为0
        var tempStep = (step >= oLis.length) ? 0 : step;
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            i === tempStep ? utils.addClass(curLi, "active")
                : utils.removeClass(curLi, "active");
        }
    }

    //6.停止和开启自动轮播
    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
    }
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
    }

    //7. 点击焦点实现轮播图的切换
    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                changeTip();
                zhufengAnimate(bannerInner, {left: -step * 1200}, 500);
            }
        }
    }();

    //8.实现左右切换
    next.onclick = autoMove;
    prev.onclick = function () {
        if (step == 0) {
            step = jsonData.length;
            utils.css(bannerInner, "left", -step * 1200);
        }
        step--;
        zhufengAnimate(bannerInner, {left: -step * 1200}, 500);
        changeTip();
    }
})();











