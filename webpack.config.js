const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const os = require('os')
const env = process.env.NODE_ENV || 'development'
const HappyPack = require('happypack')

packThreadCount = os.cpus().length - 1

const extractTextPlugin = new ExtractTextPlugin({
  filename: 'css/[name].styles.css'
})

const happyThreadPool = packThreadCount === 0 ? null : HappyPack.ThreadPool({size: packThreadCount})

const happyConf = {
  loaders: ['babel-loader?cacheDirectory=true'],
  threadPool: happyThreadPool,
  verbose: true
}

module.exports = {
	entry: {
    app: './src/entry/index.jsx',
    login: './src/entry/a.js'
	},
	output: {
		// filename: 'bundle.js',
		filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist')
  },
  devtool:"#eval-source-map",
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    },
    historyApiFallback: true,
    hot: true,
    // open: true,
    inline: true,
    progress: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {loader: 'worker-loader'}
      },
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        use: [
          packThreadCount === 0 ? 'babel-loader?cacheDirectory=true' : 'happypack/loader',
          env === 'production' ? 'remove-debug-loader' : null
        ].filter(x => x)
      },
      {
        test: /\.css$/,
        //此时用的是use没用inculde exclude
        // use: [
        //   'style-loader',
        //   'css-loader'
        // ]
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader'],
          publicPath: '../'
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                //less-loader要求的
                javascriptEnabled: true
              }
            }
         ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: ['css-loader', {
            loader: 'stylus-loader',
            options: {
              // 可以通过扩展包修改主色调
              //stylus-loader的使用方式 定义了全局变量
              // import: path.resolve(__dirname, 'src/constants.styl')
            }
          }]
        })
        //loader: ExtractTextPlugin.extract('style-loader', 'css!stylus')
      },
      // {
      //   test: /\.(png|svg|jpg|gif)$/,
      //   use: [
      //     'url-loader'
      //   ]
      // }
    ]
  }, optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      chunks: 'all',
    }
  },
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
      title: 'webpack4-splitchunk',
      template: './view/index.html'
    }),
    packThreadCount === 0 ? null : new HappyPack(happyConf),
    extractTextPlugin
  ]
}