(function () {
    var banner = document.getElementById("banner"),
        bannerInner = utils.firstChild(banner),
        bannerTip = utils.children(banner, "ul")[0];
    var divList = bannerInner.getElementsByTagName("div"),
        imgList = bannerInner.getElementsByTagName("img"),
        oLis = bannerTip.getElementsByTagName("li");
    var prev = document.getElementById("prev"),
        next = document.getElementById("next");

    // 1.实现数据绑定：ajax请求数据
    // jsonData存储我们请求过来的数据
    // count存储当前页面有几张图片，包括克隆的第一张
    var jsonData = null, count = null;
    ~function () {
        // 1）创建一个ajax对象
        var xhr = new XMLHttpRequest;
        // 2）打开一个链接
        // get请求 地址 同步请求(数据请求不回来，下面的代码不会再执行)
        // ?_=" + Math.random()清除get请求里面的缓存
        xhr.open("get", "json/banner2.txt?_=" + Math.random(), false);
        // 3）监听
        xhr.onreadystatechange = function () {
            // 网络请求状态码必须/^2\d{2}$/以2开头的三位数
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                jsonData = utils.formatJSON(xhr.responseText);
            }
        };
        // 4）发送请求
        xhr.send(null);
    }();

    // 2.按照字符串拼接的方式绑定数据
    ~function () {
        // 1)str绑定的是轮播图片区域的数据
        // 2)str2绑定的是焦点区域的数据
        var str = '', str2 = "";
        if (jsonData) {
            for (var i = 0, len = jsonData.length; i < len; i++) {
                var curData = jsonData[i];
                str += '<div><img src="" trueImg="' + curData["img"] + '"></div>';
                i === 0 ? str2 += '<li class="active"></li>' : str2 += '<li></li>';
            }
        }
        bannerInner.innerHTML = str;
        count = jsonData.length + 1;
        bannerTip.innerHTML = str2;
        utils.css(bannerTip, "right", 600 - (jsonData.length * 20) / 2);
    }();

    // 3.实现图片延迟加载
    // 首先给每一个img拿div包起来，给这个div有个默认的图加位
    // 当图片加载成功，才把图片显示出来，默认img隐藏
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            // 所有的onload事件都是异步编程，所以得用闭包实现不影响当中的i
            // 要不然所有的i都会是最后imgList.length
            // 每次循环都形成一个不销毁的私有公域，将索引保留下来
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image();
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    // 只对第一张做处理：z-index=1 opacity=1
                    if (i === 0) {
                        var curDiv = curImg.parentNode;
                        curDiv.style.zIndex = 1;
                        zhufengAnimate(curDiv, {opacity: 1}, 500);
                    }
                    oImg = null;
                }
            }(i);
        }
    }

    // 4.实现自动轮播
    var step = 0;// step记录当前展示图片的索引
    var interval = 2000;//interval多长时间定义一次自动轮播
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        // 当我们已经把最后一张展示完成之后step等于最后一张的索引
        // 我们应该重新的展示第一张，我们让step等于-1
        // 这样再经过一次累加step就等于0
        if (step == jsonData.length-1) {
            step = -1;
        }
        step++;
        setBanner();
        changeTip();
    }

    // 实现轮播图切换效果的代码
    function setBanner() {
        // 1）让step索引对应的div的zindex的值等于1
        // 让其余的div的zindex的值等于0
        for (var i = 0, len = divList.length; i < len; i++) {
            var curDiv = divList[i];
            if (i === step) {
                utils.css(curDiv, "zIndex", 1);
                // 2）让当前的透明度从0变成1，当动画结束，
                // 我们需要让其他的div的透明度的值变成0
                zhufengAnimate(curDiv, {opacity: 1}, 200, function () {
                    var curDivSib = utils.siblings(this);
                    for (var k = 0, len = curDivSib.length; k < len; k++) {
                        utils.css(curDivSib[k], "opacity", 0);
                    }
                });
                continue;
            }
            utils.css(curDiv, "zIndex", 0);
        }
    }

    // 5.实现焦点对齐
    function changeTip() {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            i === step ? utils.addClass(curLi, "active")
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
                setBanner();
            }
        }
    }();

    //8.实现左右切换
    next.onclick = autoMove;
    prev.onclick = function () {
        if (step == 0) {
            step = jsonData.length;
        }
        step--;
        setBanner();
        changeTip();
    }
})();











