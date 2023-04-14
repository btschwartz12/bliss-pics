const path = require('path')
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  output: {
    path: path.resolve(__dirname, 'BlissSlideshow', 'static', 'js'),
    filename: 'bundle.js',
  },
  mode: "development",
  
  module: {
    rules: [
      
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                "targets": "defaults" 
              }],
              '@babel/preset-react'
            ]
          }
        }]
      },
      
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }

    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_NAME': JSON.stringify('/portfolio/')
    })
  ]
}
