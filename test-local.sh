#!/bin/sh

npm run build

node render-once > index.html
mv index.html dist/index.html

mv dist anki-apkg-export-app

xdg-open http://localhost:8000/anki-apkg-export-app/
python -m SimpleHTTPServer
