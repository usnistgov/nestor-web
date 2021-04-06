# How to Contribute


## Introduction

First off, thank you for considering contributing to 
Nestor web project. It's people like you that can make Active Nestor Web such a great tool.

## Setting up a development environement

To set up a dev environement you should have `pip, node, npm` available in command line and then run the following commands :

1. `pip install zerorpc`
2. `pip install pyinstaller`
    a.  *for windows only* `pip install pypiwin32`
3. `npm install`

If the install fails, it is probably related to the zerorpc-node package. This package is used to communicate between
the python server and the rest of the application. The zerorpc package isn't maintained since August 2018 so it is becoming very difficult to 
get a stable dev environment right now. 

## Useful commands

To start the application in development mode :

`npm run electron-dev`

To package the application for your current host architecture : 

`npm run build`

After this command, you will find an executable of the application in the `dist` folder

To create the documentation of the application :

`npm run docs2md`

## How to make feedbacks 

If you have any requests, ideas or suggestions to make about nestor web, you can start an issue in the github repository. We mostly expects feedbacks concerning the workflow of the exectuable, more than some changes in the code of the application.
The issues which would involve too much modification will probably not be solved by the development team. 

Please start your issue [here](https://gitlab.nist.gov/gitlab/kea/nestor-web/-/boards)
