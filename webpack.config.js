const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.ts"
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" }
      }
    ]
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ filename: "index.html", template: "./src/index.html" }),
    new MiniCssExtractPlugin({ filename: "index.css" })
  ],
  devServer: {
    contentBase: "./src",
    compress: true,
    port: 8000
  },
  optimization: {
    minimize: true,
    minimizer: [ new CssMinimizerPlugin(), new HtmlMinimizerPlugin() ]
  }
}