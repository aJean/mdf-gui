const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  context: '/Users/qiaoyue3/Sites/mf-gui/temp',
  entry: {
    demo: './pkg.js'
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    // chunk 包加 hash [name].[chunkhash].js
    chunkFilename: '[name].js',
    path: '/Users/qiaoyue3/Sites/mf-gui/dist'
  },
  module: {
    noParse: /moment/,
    rules: [
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: 'url-loader?limit=30000&name=[name].[ext]'
      },
      {
        test: /\.(js|jsx)?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /dist|node_modules/
      },
      {
        test: /\.less$/,
        exclude: /dist|node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'mf-enhance': 'mf-enhance',
    antd: 'antd'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};
