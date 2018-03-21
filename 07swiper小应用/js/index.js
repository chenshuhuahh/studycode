/**
 * Created by hua on 2017/9/11.
 */
FastClick.attach(document.body);

~function () {
    var desW = 640,
        winW = document.documentElement.clientWidth,
        ratio = winW / desW,
        oMain = document.querySelector(".main");
    if (winW > desW) {
        oMain.style.margin = "0 auto";
        oMain.style.width = desW + 'px';
        return;
    }
    document.documentElement.style.fontSize = ratio * 100 + 'px';
}();

new Swiper('.swiper-container', {
    loop: true,
    direction: 'vertical',
    onSlideChangeEnd: function (swiper) {
        //swiper.slides获取Swiper的slides对象数组
        //swiper.activeIndex返回当前活动块(激活块)的索引。loop模式下注意该值会被加上复制的slide数。
        var slideAry = swiper.slides,
            curIndex = swiper.activeIndex,
            total = slideAry.length,
            targetId = 'page';
        //计算id是page多少
        switch (curIndex) {
            case 0:
                targetId += total - 2;
                break;
            case total - 1:
                targetId += 1;
                break;
            default:
                targetId += curIndex;
                break;
        }
        [].forEach.call(slideAry, function (item, index) {
            if (curIndex === index) {
                item.id = targetId;
                return;
            } else {
                item.id = "";
            }
        });
    }
});

~function () {
    var musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');

    musicMenu.addEventListener('click', function () {
        if (musicAudio.paused) {
            musicAudio.play();
            musicMenu.className = 'music move';
            return;
        }
        musicAudio.pause();
        musicMenu.className = 'music';
    }, false);

    function controlMusic() {
        musicAudio.volume = 0.1;
        musicAudio.play();
        musicAudio.addEventListener('canplay', function () {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music move';
        }, false);
    }

    window.setTimeout(controlMusic, 1000);
}();