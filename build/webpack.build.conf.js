const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf.js");
//const FileManagerPlugin = require("filemanager-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const buildWebpackConfig = merge(baseWebpackConfig, {
    // BUILD settings gonna be here
    mode: "production",
    //contentBase: baseWebpackConfig.externals.paths.dist,

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.SourceMapDevToolPlugin({
            filename: "[file].map"
                //path: `${baseWebpackConfig.externals.paths.assets}`
                //publicPath: `${baseWebpackConfig.externals.paths.assets}sourcemaps/`
                //fileContext: "pulic"
        })

        /* new FileManagerPlugin({
                                onStart: [{
                                    delete: ["./dist"]
                                }],
                                onEnd: [
                                    { mkdir: ["dist/assets/sourcemaps/"] },
                                    {
                                        copy: [{
                                                source: "dist/assets/js/*.*.map",

                                                destination: "dist/assets/sourcemaps/"
                                            },
                                            {
                                                source: "dist/assets/css/*.*.map",
                                                destination: "dist/assets/sourcemaps/"
                                            }
                                        ]
                                    },
                                    { delete: ["dist/assets/css/**.map", "dist/assets/js/**.map"] }
                                ]
                            }) */
    ]
});

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig);
});