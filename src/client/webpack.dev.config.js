const path = require("path");
var autoprefixer = require("autoprefixer");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    home: "./src/client/src/home/app.ts",
    login: "./src/client/src/login/app.ts",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "build/",
  },
  mode: "development",
  devtool: "inline-source-map",
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
        test: /\.mp3$/,
        loader: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [new TerserPlugin()],
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
};
