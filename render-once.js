'use strict';

const htmlPath = './dist/index.html';
const resourceFrom = '/anki-apkg-export-app';
const resourceTo = './dist';

const jsdom = require('jsdom');
const fs = require('fs');
const html = fs.readFileSync(htmlPath, 'utf-8');

let cssUrl;
let css;

jsdom.env(
  html,
  function (err, window) {
    if (err) {
      throw err;
    }

    const document = window.document;

    const el = window.document.querySelector(`link[href="${cssUrl}"]`);
    document.head.removeChild(el);

    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    console.log(window.document.documentElement.outerHTML); // stdout
  },
  {
    resourceLoader: function (resource, callback) {
      const pathname = resource.url.pathname;

      if (/\.js$/.test(pathname)) {
        resource.url.pathname = pathname.replace(resourceFrom, resourceTo);

        return resource.defaultFetch(function (err, body) {
          if (err) {
            throw err;
          };

          callback(null, body);
        });
      } else if (/\.css$/.test(pathname)) {
        resource.url.pathname = pathname.replace(resourceFrom, resourceTo);

        return resource.defaultFetch(function (err, body) {
          if (err) {
            throw err;
          };

          cssUrl = pathname;
          css = body;
          callback(null, body);
        });
      } else {
        return resource.defaultFetch(callback);
      }
    },
    features: {
      FetchExternalResources: ['script', 'link'],
      ProcessExternalResources: ['script', 'link'],
      SkipExternalResources: false
    }
  }
);
