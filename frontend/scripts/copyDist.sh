#!/usr/bin/env bash

npm run copyBackendConfig && vue-cli-service build &&
rm -rf ../backend/dist &&
cp -r dist ../backend &&
rm -rf ../backend/dist/manifest.json  ../backend/dist/service-worker.js ../backend/dist/robots.txt
