/* eslint-disable @typescript-eslint/no-require-imports */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    {
        entry: "./src/main",
        target: "electron-main",
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.dist.js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    include: path.join(__dirname, "src"),
                    loader: "babel-loader",
                },
            ],
        },
    },
    {
        entry: "./src/main.renderer.tsx",
        target: "electron-renderer",
        devtool: "source-map",
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "renderer.dist.js",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    include: path.join(__dirname, "src"),
                    loader: "babel-loader",
                },
                {
                    test: /\.css$/,
                    include: path.join(__dirname, "src"),
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
    },
];
