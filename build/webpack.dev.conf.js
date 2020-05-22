const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf.js");

const devWebpackConfig = merge(baseWebpackConfig, {
    // DEV settings gonna be here
    mode: "development",

    // Source map
    devtool: "eval-source-map",
    //"eval-cheap-module-source-map",

    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,
        // historyApiFallback: true,
        // noInfo: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 8081,

        //writeToDisk: true,
        liveReload: true
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
                //publicPath: "/",
                //fileContext: "public"
        })
    ]
});
// export devWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});