#!/bin/sh
cd app
npm run build:prod
cd ..
app/node_modules/.bin/electron-packager ./app --overwrite --platform=darwin --arch=x64  --icon=app/assets/img/dock.icns --ignore=\.gitignore --out=build