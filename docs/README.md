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

# Requirements

Available in command line : pip, node, npm

Run

1. `pip install zerorpc`
2. `pip install pyinstaller`
    a.  *for windows only* `pip install pypiwin32`
3. `npm install`


# Useful commands 

To start the application in development mode :

`npm run electron-dev`

To package the application for your current host architecture : 

`npm run dist`

After this command, you will find an executable of the application in the `dist` folder

To create the documentation of the applciation :

`npm run docs`

This last command will create a `doc/` folder on the root folder of the project.
In this new folder, you will find many `.html` files. You can view the 
documentation by opening **index.html** in the browser of your choice.


