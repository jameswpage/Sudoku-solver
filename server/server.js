

const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./../webpack.config.js');
const bodyParser     =        require("body-parser");
const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + './../www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/dist',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/puzzle', function(request, response, next) { 
    console.log(request); 
    response.sendStatus(200); }
);
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});