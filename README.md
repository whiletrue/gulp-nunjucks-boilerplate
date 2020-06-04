# Gulp / Nunjucks boilerplate
A simple boilderplate to generate a static site with nunjucks templates and gulp.


- [Nunjucks templating language](https://mozilla.github.io/nunjucks/)
- [Gulp](https://gulpjs.com/)

## Setup
You need to have [node.js](https://nodejs.org/en/) with npm installed.


#### Install gulp
```javascript
$ sudo npm install --global gulp-cli
```

#### Get dependencies
```javascript
$ npm install
```


## Commands
#### Build
Builds the project and generates the static site in `dist/`. 
```
$ gulp build
```

#### Watch
Watches for changes in the templates, scripts or styles and automatically rebuilds the project. Starts a local development webserver at `http://localhost:3000` to serve the generated output.
```
$ gulp watch
```


## Todo
- Production mode with build optimisation (bundling and minimising js, css)
- Dynamic base-path to be used for the navigation when the project is deployed in a subfolder