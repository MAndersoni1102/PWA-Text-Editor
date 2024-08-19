const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.
// This exports the configuration for webpack.
module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // This Webpack plugin generates our html file and injects the bundles.
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      // This injects our customer service worker into the service worker file.
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // This creates the manifest file for our PWA.
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A simple text editor",
        background_color: "#01579b",
        theme_color: "#01579b",
        // This is the start url of the app.
        start_url: "/",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("./favicon.ico"),
            size: [48],
            destination: path.join("assets", "icons"),
            type: "image/ico",
          },
        ],
      }),
    ],

    module: {
      // The rules in the module are used to define how webpack should handle different file types.
      rules: [
        {
          // Regex to find the css files.
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          // Regex to find the js files.
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-runtime",
                "@babel/plugin-proposal-object-rest-spread",
              ],
            },
          },
        },
      ],
    },
  };
};