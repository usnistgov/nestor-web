# Nestor Web Application

This software was developed at the National Institute of Standards and
Technology by employees of the Federal Government in the course of their
official duties. Pursuant to title 17 section 105 of the United States
Code this software is not subject to copyright protection and is in the
public domain. ml-py is an experimental system. NIST assumes no
responsibility whatsoever for its use by other parties, and makes no
guarantees, expressed or implied, about its quality, reliability, or any
other characteristic. We would appreciate acknowledgement if the
software is used. This software can be redistributed and/or modified
freely provided that any derivative works bear some notice that they are
derived from it, and any modified versions bear some notice that they
have been modified.

## Download
Nestor web application is available for WIndows 10 and OS X users. The application can be downloaded directly from the github [repository](https://gitlab.nist.gov/gitlab/kea/nestor-suite/nestor/-/releases)

## Purpose
Nestor web application is one the GUI available for using nestor python package. The goal of the application is to provide a user-friendly and well designed user interface for helping manufacturers annotate their data. For more information or anything you can't find here, please visit [nestor documentation](https://kea.ipages.nist.gov/nestor-suite/nestor/).


## Quick Links

- [Nestor documentation](https://kea.ipages.nist.gov/nestor-suite/nestor/)
- [User Guide](Getting%20Started/USERGUIDE.md)
- [How to contribute](Getting%20Started/CONTRIBUTING.md)


## Development/Contribution Guidelines

Available in command line : pip, node, npm

Run

1. `pip install zerorpc`
2. `pip install pyinstaller`
    a.  *for windows only* `pip install pypiwin32`
3. `npm install`


### Useful commands 

To start the application in development mode :

`npm run electron-dev`

To package the application for your current host architecture : 

`npm run build`

After this command, you will find an executable of the application in the `dist` folder

To create the documentation of the applciation :

`npm run docs2md`

This last command will create and put the updated frontend documentation into the `docs/Source documentation/frontend` folder on the root folder of the project. 
The [documentation ](https://kea.ipages.nist.gov/nestor-suite/nestor-web/) is automatically updated nd redeployed on every push on the master branch.

## Future of Nestor web
This is an open source project offered at no cost. It will be maintained for small fixes only. If you want to update the dependencies, we would be happy to accept the changes, and release a new version. 
