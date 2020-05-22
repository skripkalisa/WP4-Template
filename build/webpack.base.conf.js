const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
    src: path.join(__dirname, "../src/"),
    dist: path.join(__dirname, "../public/"),
    build: path.join(__dirname, "./build/"),
    assets: "assets/"
};

const PAGES_DIR = `${PATHS.src}/pug/`;
const PAGES = fs
    .readdirSync(PAGES_DIR)
    .filter(fileName => fileName.endsWith(".pug"));

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: {
        app: PATHS.src,
        lk: `${PATHS.src}js/another.js`
    },

    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/"
            },

            {
                test: /\.pug$/,
                oneOf: [
                    // this applies to <template lang="pug"> in Vue components
                    {
                        resourceQuery: /^\?vue/,
                        use: ["pug-plain-loader"]
                    },
                    // this applies to pug imports inside JavaScript
                    {
                        use: ["pug-loader"]
                    }
                ]
            },

            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]"
                }
            },
            {
                test: /\.styl$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: PATHS.build }
                        }
                    },
                    {
                        loader: "stylus-loader",
                        options: { sourceMap: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",

                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: `${PATHS.assets}css/`,
                            sourceMap: true
                        }
                    },

                    {
                        loader: "css-loader",
                        options: { sourceMap: true }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            config: { path: PATHS.build }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "~": "src"
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[contenthash].css`
        }),

        new CopyWebpackPlugin([
            { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
            { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` },
            { from: `${PATHS.src}/static`, to: "" }
        ]),
        /* new HtmlWebpackPlugin({
                    template: `${PATHS.src}index.html`,
                    filename: "index.html"
                }), */

        // Automatic creation any html pages (Don't forget to RERUN dev server)
        // see more: https://github.com/vedees/webpack-template/blob/master/README.md#create-another-html-files
        // best way to create pages: https://github.com/vedees/webpack-template/blob/master/README.md#third-method-best
        ...PAGES.map(
            page =>
            new HtmlWebpackPlugin({
                template: `${PAGES_DIR}/${page}`,
                filename: `./${page.replace(/\.pug/, ".html")}`
            })
        )
    ]
};