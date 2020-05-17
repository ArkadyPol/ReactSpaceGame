const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const babelOptions = (presets) => {
  const opts = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"],
  };
  if (presets.length) {
    opts.presets.push(...presets);
  }
  return opts;
};

const babelPresets = {
  js: [],
  ts: ["@babel/preset-typescript"],
  jsx: ["@babel/preset-react"],
  get tsx() {
    return [this.jsx[0], this.ts[0]];
  },
};

const babelRule = (ext) => {
  return {
    test: new RegExp(`\.${ext}$`),
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: babelOptions(babelPresets[ext]),
    },
  };
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
  },
  module: {
    rules: [
      babelRule("js"),
      babelRule("ts"),
      babelRule("jsx"),
      babelRule("tsx"),
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
};
