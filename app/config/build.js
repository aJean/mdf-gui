/**
 * @file create webpack config
 */

const classPlugin = require('@babel/plugin-proposal-class-properties');
const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');

module.exports = function(data, webpack) {
  return {
    mode: 'production',
    devtool: false,
    entry: {
      [data.name]: data.entry
    },
    output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      // chunk 包加 hash [name].[chunkhash].js
      chunkFilename: '[name].js',
      path: data.output
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
              presets: [[presetEnv, { modules: false }], presetReact],
              plugins: [classPlugin]
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
    resolveLoader: {
      modules: [`${data.appPath}/node_modules`]
    },
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
  };
};
