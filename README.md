Nestor Web Application

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

Requirements

Available in command line : pip, node, npm

Run

1. `pip install zerorpc`
2. `pip install pyinstaller`
    a.  *for windows only* `pip install pypiwin32`
3. `npm install`

Dev Mode

Run
:`npm run-script electron-dev`

Build
:`npm run-script build`

Package python
:`pyinstaller --additional-hooks-dir=. python/api.py --distpath pythondist`

Package
:`./node_modules/.bin/electron-packager . --icon=build/icon.ico --overwrite`
