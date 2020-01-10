#!/bin/sh
cd app
npm run build:prod
cd ..
npx electron-packager ./app --overwrite --platform=darwin --arch=x64  --icon=app/assets/img/dock.icns --ignore=\.gitignore --out=build