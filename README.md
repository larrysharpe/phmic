# Angular Init Project (Gulp, Sass, BrowserSync, Node + Express)

**Based on HotTowel Angular from John Papa**

>*Opinionated Angular style guide for teams by [@john_papa](//twitter.com/john_papa)*

>More details about the styles and patterns used in this app can be found in my [Angular Style Guide](https://github.com/johnpapa/angularjs-styleguide) and the [Angular Patterns: Clean Code](http://jpapa.me/ngclean) course at [Pluralsight](http://pluralsight.com/training/Authors/Details/john-papa) and working in teams.

## What is different from John Papa's HotTowel?
All the credits for the Gulp Tasks go to the amazing [John Papa's HotTowel Generator](https://github.com/johnpapa/generator-hottowel). I only made some tweaks to have a cleaner starting points for my future projects.
Here are the main differences from the original:
- SASS instead of LESS. with dynamic sass import into the main styles.scss for any .scss file that resides inside the app folder
- Angular 1.5, Angular Animate 1.5, Angular-mocks 1.5, Angular-Sanatize 1.5
- Remove toastr and jQuery dependency
- add angular-moment module
- cleaned layout module to a simple shell.html
- the gulp tasks are split in their respective file for easier configuration and maintenance
- Starter Style framework that imports from Bootstrap 3 only the basics (normalize, scaffolding, grid, mixins...). It has demo ready folder to be able to quickly start styling and visualizing 

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

## Getting started

### Installing Packages
 - `npm install`
 - `bower install`

### Linting
 - Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running in dev mode
 - Run the project with `gulp serve-dev`

 - opens it in a browser and updates the browser with any files changes.

### Building the project
 - Build the optimized project using `gulp package-optimize`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

### Structure
The structure also contains a gulpfile.js and a server folder. The server is there just so we can serve the app using node. Feel free to use any server you wish.

	/src
		/client
			/app
			/content

### The Modules
The app has 4 feature modules and depends on a series of external modules and custom but cross-app modules

```
app --> [
        app.home --> [
            app.core,
            app.widgets
        ],
        app.layout --> [
            app.core
        ],
        app.widgets,
		app.core --> [
			ngAnimate,
			ngSanitize,
			ui.router,
			blocks.exception,
			blocks.logger,
			blocks.router
		]
    ]
```

#### core Module
Core modules are ones that are shared throughout the entire application and may be customized for the specific application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies.

#### blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

##### blocks.logger Module
The `blocks.logger` module handles logging across the Angular app.

##### blocks.exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

##### blocks.router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.

## Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-fonts`

    Remove all fonts from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp build-fonts`

    Copy all fonts from fonts folder to the css folder
    
- `gulp package-fonts`

    Copy all fonts from source folder to the build folder

- `gulp package-images`

    Copy all images from source to the build folder

### Styles

#### Install Bootstrap Sass

This project import the basic sass files from Bootstrap 3, you first need to install its dependency.
- `cd src/client/scss` 
- `bower install`

#### Build Styles
- `gulp build-styles`

    Compile sass files to CSS, add vendor prefixes

#### Demo styles guide for the project

If you want to first style the global elements for your site (buttons, forms, thumbnails...) and create a style guide
- from the scss folder cd into the _demo folder `cd _demo`
- install npm package `npm install`
- run the gulp task `gulp sass` or `gulp sass-watch`
You can then edit the index.html file from the _demo folder, include your elements and start building your styles guide. 

### Angular JS code

- `gulp inject-jsAppDep`

    Looks up all the JavaScript source code, then adds them to the `index.html`.

### Bower Files

- `gulp inject-wiredep`

    Looks up all bower components' main files then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp build-templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp build-templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

- `gulp serve-dev --nosync`

    Serves the development code without launching the browser.

- `gulp serve-dev --debug`

    Launch debugger with node-inspector.

- `gulp serve-dev --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Building Production Code

- `gulp build`

    Run tests, inject all files (bower, angular code and css) into index.html, copy fonts to css fonts folder

- `gulp package-optimize`

    Clean build folder, Copies all fonts, copies images and package all js to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

    Serve the optimized code from the build folder and manually launch the browser.

- `gulp serve-build --debug`

    Launch debugger with node-inspector.

- `gulp serve-build --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Bumping Versions

- `gulp bump`

    Bump the minor version using semver.
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --ver=1.2.3 // specific version

## License

MIT
