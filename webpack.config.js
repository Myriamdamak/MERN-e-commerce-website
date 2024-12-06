const path = require("path");

module.exports = {
  entry: "./src/app.jsx", // Point to your entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/ ,// Match JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx",'.mjs', '.json'], // Ensure .jsx is included
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    historyApiFallback: true,
    port: 3000,
  },
};
