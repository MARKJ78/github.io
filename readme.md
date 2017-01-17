#Dev build in react/es6/sass with minified, prefixed production build via webpack.

##Then automatically deploy prod ./dist to gh-pages branch

###To use this template, Download or clone this repo.

git clone https://github.com/MARKJ78/react-sass-template.git {NEW APP NAME}

###set up env.

git init
git add .
git commit -m "init"
git remote add origin <URL>
git remote set-url origin <URL>
git remote -v
git push origin master


npm install --only=prod
npm install --only=dev


npm start - dev env - localhost:1234
npm run deploy - production build and deploy to gh_pages (change route in index)
