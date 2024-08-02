var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require('path');

module.exports = {
  mode: 'development',
  entry: './app/app.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.bpmn$/,
        use: {
          loader: 'raw-loader'
        }
      },
	  {
		test: /\.(svg)$/i,			
		type: 'asset/resource'	
	  }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'app/index.html', to: '.' }
      ]
    })
  ]
};

