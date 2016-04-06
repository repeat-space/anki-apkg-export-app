'use strict';

const htmlPath = './dist/index.html';
const jsPathFrom = '/anki-apkg-export-app';
const jsPathTo = './dist';

const jsdom = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync(htmlPath, 'utf-8');

jsdom.env(
  html,
  function (err, window) {
    if (err) {
      throw err;
    }

    console.log(window.document.documentElement.outerHTML); // stdout
  },
  {
    resourceLoader: function (resource, callback) {
      const pathname = resource.url.pathname;

      if (/\.js$/.test(pathname)) {
        resource.url.pathname = pathname.replace(jsPathFrom, jsPathTo);

        return resource.defaultFetch(function (err, body) {
          if (err) {
            throw err;
          };

          callback(null, body);
        });
      } else {
        return resource.defaultFetch(callback);
      }
    },
    features: {
      FetchExternalResources: ['script'],
      ProcessExternalResources: ['script'],
      SkipExternalResources: false
    }
  }
);
