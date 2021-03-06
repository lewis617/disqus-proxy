const path = require('path')
const resolve = p => path.resolve(__dirname, p)

const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index',
  output: {
    path: resolve('./lib'),
    filename: 'hexo-disqus-proxy-primary.js',
    chunkFilename: "[name].chunk.[id].js",
    publicPath: "/scripts/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: './src/avatars', to: resolve('./lib/avatars')}
    ]),
    new UglifyJSPlugin()
  ]
}
