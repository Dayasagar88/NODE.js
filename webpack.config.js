const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,  // Match all .css files
        use: [
          'style-loader',  // Injects CSS into the DOM
          'css-loader',    // Translates CSS into CommonJS
          'postcss-loader' // Processes CSS with PostCSS (and Tailwind)
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    client: {
      logging: 'none',  // This reduces the log output
    },
  },
  stats: 'errors-only',  // Only show errors
};
