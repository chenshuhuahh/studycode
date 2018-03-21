var cookieRender = (function(){
    //设置，expires过期时间，path路径，domain当前的一个域
    function setValue(options){
        var _default = {
            name: null,
            value: null,
            expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24)),
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if(options.hasOwnProperty(key)){
                _default[key] = options[key];
            }
        }
        document.cookie = _default.name + "=" + escape(_default.value) + 
            ";expires=" + _default.expires.toGMTString() + 
            ";path=" + _default.path + ";domain=" + _default.domain;
    }
    //获取，正则匹配
    function getValue(name){
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    }
    //删除:原理就是让过期时间变成一个今天日期之前的
    function removeValue(options){
        var _default = {
            name: null,
            path: '/',
            domain: ''
        };
        for (var key in options) {
            if(options.hasOwnProperty(key)){
                _default[key] = options[key];
            }
        }
        if (getValue(_default.name)) {
            document.cookie = _default.name + "= ; path=" + _default.path  +"; domain="
             + _default.domain + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }

    return {
        set: setValue,
        get: getValue,
        remove: removeValue
    }
})();


var cookie = {
    set: function (name, value, expires, path, domain) {
        if (typeof expires === "undefined") {
            expires = new Date(new Date().getTime() + (1000 * 60 * 60 * 24));
        }
        document.cookie = name + "=" + escape(value) + ((expires) ? 
            ";expires=" + expires.toGMTString() : "") + ((path) ? 
            ";path=" + path : ";path=/") + ((domain) ? ";domain=" + domain : "");
    },
    get: function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) {
            return unescape(arr[2]);
        }
        return null;
    },
    clear: function (name, path, domain) {
        if (this.get(name)) {
            document.cookie = name + "=" + ((path) ? "; path=" 
                + path : "; path=/") + ((domain) ? "; domain=" + domain : "") 
            + ";expires=Fri, 02-Jan-1970 00:00:00 GMT";
        }
    }
};