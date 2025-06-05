const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3003,
    static: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    liveReload: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        catalog: 'catalog@http://localhost:3000/remoteEntry.js',
        cart: 'cart@http://localhost:3004/remoteEntry.js',
        // profile: 'profile@http://localhost:3004/remoteEntry.js',
      },
      exposes: {
        './eventBus': './src/eventBus.js'
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        "common-utils": { singleton: true, eager: true },
        'rxjs/operators': { singleton: true, eager: true },
        rxjs: { singleton: true, eager: true }
      }
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};