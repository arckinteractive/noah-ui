#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/arckinteractive/noah-ui.git master:gh-pages

cd -
