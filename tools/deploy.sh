#!/usr/bin/env bash
# Сборка и выкладка на GitHub Pages (ветка gh-pages). Каркас yg-core лежит рядом
# (../yg-core), в CI его нет — поэтому собираем локально и пушим готовый dist.
set -e
cd "$(dirname "$0")/.."
npm run build
cd dist
touch .nojekyll
rm -rf .git && git init -q -b gh-pages && git add -A && git commit -qm "deploy $(date +%F_%T)"
git push -qf "$(git -C .. remote get-url origin)" gh-pages
rm -rf .git
