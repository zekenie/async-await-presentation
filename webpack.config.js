module.exports = {
  entry: {
    asyncAwait: ['whatwg-fetch','./src/async-await/index.js'],
    promises: ['whatwg-fetch', './src/promises/index.js'],
    callbacks: ['whatwg-fetch', './src/simple-async/index.js']
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/docs',
    filename: './[name].js'
  },
  module: {
    loaders: [
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.jsx?$/,
        exclude: /(code-samples|node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'es2016']
        }
      }
    ]
  }
};