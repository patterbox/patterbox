const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  APP_DIR: Path.join(__dirname, '../app'),
  BUILD_DIR: Path.join(__dirname, '../public'),
  ENTRY_POINT: Path.join(__dirname, '../app/components/routing/index.jsx'),
  INDEX_HTML: Path.join(__dirname, '../public/index.html')
};

module.exports = (options) => {
  const ExtractSASS = new ExtractTextPlugin(`/public/dist/${options.cssFileName}`);

  const webpackConfig = {
    devtool: options.devtool,
    entry: [
      `webpack-dev-server/client?http://localhost:${+ options.port}`,
      'webpack/hot/dev-server',
      paths.ENTRY_POINT,
    ],
    output: {
      path: paths.BUILD_DIR,
      filename: `/public/dist/${options.jsFileName}`,
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    module: {
      loaders: [{
        test: /.jsx?$/,
        include: paths.APP_DIR,
        loader: 'babel',
      }],
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development'),
        },
      }),
      new HtmlWebpackPlugin({
        template: paths.INDEX_HTML,
      }),
    ],
  };

  if (options.isProduction) {
    webpackConfig.entry = [paths.ENTRY_POINT];

    webpackConfig.plugins.push(
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
      ExtractSASS
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: ExtractSASS.extract(['css', 'sass']),
    });
  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    });

    webpackConfig.devServer = {
      contentBase: Path.join(__dirname, '../'),
      hot: true,
      port: options.port,
      inline: true,
      progress: true,
      historyApiFallback: true,
    };
  }

  return webpackConfig;
};
