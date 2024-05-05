/* eslint-disable func-names */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false,
    },
  }),
);

app.use(webpackHotMiddleware(compiler));

app.use(
  express.static(__dirname, {
    setHeaders(res) {
      res.cookie('XSRF-TOKEN-D', '1234abc');
    },
  }),
);

app.use(bodyParser.json());
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  multipart({
    uploadDir: path.resolve(__dirname, 'upload-file'),
  }),
);

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));

const router = express.Router();

registerPage();
registerSimpleRouter();
registerBaseRouter();

app.use(router);

const port = process.env.PORT || 8080;
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});

function registerPage() {
  router.get('/', function (req, res) {
    res.render('index');
  });

  router.get('/simple', function (req, res) {
    res.render('template', { title: 'simple' });
  });

  router.get('/base', function (req, res) {
    res.render('template', { title: 'base' });
  });
}

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: `hello world`,
    });
  });
}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query);
  });

  router.post('/base/post', function (req, res) {
    res.json(req.body);
  });

  router.post('/base/buffer', function (req, res) {
    const msg = [];
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk);
      }
    });
    req.on('end', () => {
      const buf = Buffer.concat(msg);
      res.json(buf.toJSON());
    });
  });
}
