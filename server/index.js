'use strict';

const app = require('express')();

const port = 4000;

module.exports = (cb) => {
  const callbackUrl = 'http://localhost:4000/callback';

  app.listen(port, (err) => {
    if (err) return console.error(err);

    console.log(`Express server listening at http://localhost:${port}`);

    return cb({
      app,
      callbackUrl,
    });
  });
};