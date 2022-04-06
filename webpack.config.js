const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// mode
const mode = process.env.NODE_ENV || 'development'

// directory
const SRC_DIR = path.join(__dirname, './src')
const DIST_DIR = path.join(__dirname, './dist')
const PUBLIC_DIR = path.join(__dirname, './public')

module.exports = {
  mode,
  entry: {
    app: path.join(SRC_DIR, 'index.tsx'),
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 2222,
  },
  output: {
    filename: '[name].js',
    path: DIST_DIR,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        use: 'ts-loader',
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './[name][ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, 'index.html'),
      templateParameters: {
        env: process.env.NODE_ENV === 'production' ? '' : '[DEV]',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? { collapseWhitespace: true, removeComments: true }
          : false,
    }),
    new CleanWebpackPlugin(),
  ],
}
