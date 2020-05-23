const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const babelRule = (ext) => {
  const rule = {
    test: new RegExp(`\.${ext}$`),
    include: path.resolve(__dirname, 'src'),
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
          cacheDirectory: true,
        },
      },
    ],
  };
  if (ext[2] === 'x') rule.use[0].options.presets.push('@babel/preset-react');
  if (ext[0] === 't')
    rule.use.push({
      loader: 'ts-loader',
    });
  return rule;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      babelRule('js'),
      babelRule('ts'),
      babelRule('jsx'),
      babelRule('tsx'),
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
