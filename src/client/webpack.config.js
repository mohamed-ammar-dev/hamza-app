const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    home: "./src/client/src/home/app.ts",
    login: "./src/client/src/login/app.ts",
    error: "./src/client/src/error/app.ts",
    forgotPassword: "./src/client/src/forgotPassword/app.ts",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "build/",
  },

  mode: "production",
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png)$/,
        loader: "image-webpack-loader",
        enforce: "pre",
      },
      {
        test: /\.(png|svg)$/,
        loader: "url-loader",
        options: {
          // files larger than 25 KB won’t be inlined
          limit: 25 * 1024,
        },
      },
      {
        test: /\.(mp3)$/,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new TerserPlugin(), new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
};
