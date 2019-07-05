#!/usr/bin/env sh

# abort on errors
set -e

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://hypejunction.github.io/<REPO>
git push -f git@github.com:arckinteractive/noah-ui.git master:gh-pages

cd -
