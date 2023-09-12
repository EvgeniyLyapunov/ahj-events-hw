const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 3000,
    open: true,
    watchFiles: ["src/**/*"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
