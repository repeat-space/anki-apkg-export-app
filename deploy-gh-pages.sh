#!/bin/sh

rm -rf dist
npm run build
node render-once > dist/index.html

cd dist

git init
git config user.name "Travis-CI"
git config user.email "travis@ewnd9.com"

git add .
git commit -m "Deploy to GitHub Pages"

# git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
git push --force "https://${GH_TOKEN}@${GH_REF}" master:gh-pages
