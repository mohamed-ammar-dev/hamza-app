const path = require("path");

module.exports = {
  entry: {
    home: "./src/client/src/home/app.ts",
    login: "./src/client/src/login/app.ts",
    error: "./src/client/src/error/app.ts",
    forgotPassword: "./src/client/src/forgotPassword/app.ts",
    resetPassword: "./src/client/src/resetPassword/app.ts",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/build/",
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
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
};
