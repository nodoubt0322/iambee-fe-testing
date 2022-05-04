npm run build
cd dist 
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/nodoubt0322/iambee-fe-testing.git master:gh-pages 
cd -