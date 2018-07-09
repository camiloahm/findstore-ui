# Find Store UI

Application that is used to show the closest stores to a given position. This front end app is used to with Find Store services back end. In stage enviroment this ui is running on Nginx server. 

## Stage Version (DEMO)
You can try the app here http://35.233.254.61/

## Context Diagram

`Deployment`
https://www.lucidchart.com/documents/view/0f1c8b62-be54-4062-b269-79f54fa5455a

## Components

`UI`
* findstore-ui repository https://github.com/camiloahm/findstore-ui

`Service`
* findstore-service repository https://github.com/camiloahm/findstore/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

`Local`
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

`Online IDE`
If you don't want to set up a local `IDE` you can try the app without some features like http calls here 
https://stackblitz.com/edit/jumbo-ysq3pp


If you don't need to configure the environment in your machine but you want to test it locally you can use docker public images and run it in your machine.

`Docker`
```
$ sudo docker run -p 3000:8080 camiloahm/findstore-service 
```
```
$ sudo docker run -p 4000:80 camiloahm/findstore-ui 
```


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
