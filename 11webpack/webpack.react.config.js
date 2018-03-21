var htmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
module.exports = {
    entry: {  //打包的入口文件
        build:"./react/index.js"
    },
    output: {  //打包结果的文件
        filename : '[name].js',//输出文件名
        path : __dirname + '/react_build',//输出文件路径
    },
    module: {  //对模块的处理逻辑 对象
        loaders: [  //一系列的加载器 数组
            {
                test: /.css$/,  //正则，匹配到的文件的后缀名
                loaders: ['style-loader', 'css-loader'],  //匹配处理到的文件
                exclude: "/node_modules/"   //排除的文件夹
            },
            {
                test: /.js$/,  //正则，匹配到的文件的后缀名
                loaders: ['babel-loader'],  //匹配处理到的文件
                exclude: "/node_modules/",   //排除的文件夹
                include:path.resolve(__dirname,"/react/")  //包含在哪个目录下
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    resolve:{  //自动补全后缀名
        extensions:['.js','.css','.jsx']
    },
    plugins:[
        new htmlWebpackPlugin({
            title: "my react html",  //生成的html文档的标题
            filename: "class.html",   //输出文件的文件名称，默认为index.html，不配置就是该文件名；
            // 此外，还可以为输出文件指定目录位置（例如'html/index.html'）
            chunks:["build"]    //允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
            // 在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
        })
    ]
};
