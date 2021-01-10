import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { ServerStyleSheet } from 'styled-components';

import { StaticRouter as Router } from 'react-router-dom';

import SwitchApp from './router';

import path from 'path';

import pjson from '../package.json';

import favicon from './middlewares/favicon';

const app = express();

// Middlewares
app.use(
  bodyParser.json({
    limit: '200mb',
  })
);

app.use(
  bodyParser.urlencoded({
    limit: '200mb',
    parameterLimit: 100000,
    extended: true,
  })
);

app.use(cors());
app.use(favicon());
app.use(compression());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(
  express.static(
    `${__dirname}/../public`,
    process.env.NODE_ENV === 'production' ? { maxAge: '86400000' } : {}
  )
);

// View engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

const router = express.Router();

router.get('*', async (req, res) => {
  try {
    const sheet = new ServerStyleSheet();

    const App = ({ location, context }) => (
      <Router location={location} context={context}>
        <SwitchApp language="en" />
      </Router>
    );

    const reactComp = renderToString(
      sheet.collectStyles(
        <App location={req.url} context={{}} cookies={req.cookies} />
      )
    );

    const styles = sheet.getStyleTags();

    return res.status(200).render('main', {
      reactApp: reactComp,
      styles,
    });
  } catch (ex) {
    console.error(ex);

    const App = () => (
      <div
        className="container is-fluid"
        style={{
          padding: '15px',
          height: '100vh',
        }}
      >
        <article className="message is-danger">
          <div className="message-header">
            <p> Server Error: </p>{' '}
          </div>{' '}
          <div
            className="message-body"
            style={{
              height: '100%',
            }}
          >
            {' '}
            {`${ex}`}{' '}
          </div>{' '}
        </article>{' '}
      </div>
    );

    const reactComp = renderToString(
      <App location={req.url} context={{}} cookies={req.cookies} />
    );

    return res.status(500).render('main', {
      reactApp: reactComp,
      styles: '',
    });
  }
});

app.use('/', router);

const PORT = process.env.PORT || 3000;
const IP_BIND = process.env.IP || '0.0.0.0';

app.listen(PORT, IP_BIND, () => {
  console.log(`
  => Starting ${pjson.name}
  => Node.js application starting in ${
    process.env.NODE_ENV || 'development'
  }
  * Listening on http://${IP_BIND}:${PORT}/
  * Environment: ${process.env.NODE_ENV || 'development'}
  Use Ctrl-C to stop
  `);
});
