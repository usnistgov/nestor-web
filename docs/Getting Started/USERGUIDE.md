# Nestor User Guide

Developed by

- **Cedric Bell** : Nestor web developer (2019-2020)
- **Sakina Laanani** : Nestor web developer (2018-2019)
- **Thurston Sexton** : Nestor Lead
- **Michael Brundage** : Project Lead 

## Introduction


This user guide of the Nestor application addresses how to use the web version of Nestor. 
The goal of the web version is to present with a more user
friendly Graphical User Interface (GUI) design with the same features as previous versions of 
[Nestor](https://nestor.readthedocs.io/en/latest/index.html). 
The original version of Nestor is still available on [Github](https://github.com/usnistgov/nestor). 

## 1. Settings


### 1.1 Home 

![](../resources/media/image16.png)
<div align="center"><strong>figure 1 : Home page of Nestor (header
in red)</strong></div><br/>

  
When the application starts, a loading screen will appear followed by [figure 1](#11-home). 
A user can navigate to the tagging tool and
the dashboard through the header at any time. On this header, there is also a save
button which will remain disabled unless you start a new project. The header also displays the current project's name.
Clicking on the new project button will redirect to the upload page ([figure 3](#13-upload-a-file)). 
Clicking on the manage projects button will prompt the following screen [figure 2](#12-manage-projects).

 

### 1.2 Manage projects 

![](../resources/media/image22.png)

<div align="center"><strong>figure 2 : Manage project popup</strong></div><br/>

This popup is opened when a user clicks on the Manage projects button in the
home page. On this popup, a user can select one project from their projects
list and then either open or delete it. 
When a user deletes one project, it will not appear in the project list.
Opening a project will redirect to the Overview tab ([figure 6](#16-overview)) with all
the loaded settings and tagged tokens of the previous saved state.
If no projects are saved, a user will be prompted to create a new project. 

 

### 1.3 Upload a file 
-----------------

![](../resources/media/image3.png)

<div align="center"><strong>figure 3 : Upload a new file</strong></div><br/>

The "select a file" green button asks for the csv file for input. Once a file is uploaded successfuly, the name of the file will appear below the green button. 
Clicking on the start button directs the user to [figure 4](#14-select-columns) below.

 

### 1.4 Select columns
------------------

![](../resources/media/image13.png)
<div align="center"><strong>figure 4 : Select columns page</strong></div><br/>

In this tab, the user selects the columns which will be the tagged. The application will provide the headers of the csv file to aid the user in selecting these columns. 
The user should select the natural language columns, as of now Nestor cannot tag dates or numbers. 
Some improvements are under development to better handle these types of columns. 
Hovering the mouse on the column's name will preview what is in each column. Once the columns that will be tagged are selected, click Continue [figure 5](#15-classification).

### 1.5 Classification 
------------------

![](../resources/media/image15.png)
-----------------------------------------------------------------------

<div align="center"><strong>Figure 5 : Classification explanation</strong></div><br/>

This page shows the tag types. As of now, tokens can be classified as item, solution, problem, unknown and
non entity. Moreover, two hybrid classifications are available for the
multiTokens : Object Fault which links problem and item pairs and an Object Resolution, which links solution and item pairs.
Hovering over each will give an explanation. 
(![](../resources/media/image9.png)). Next, click on the Continue tab ([figure 6](#16-overview)).

### 1.6 Overview
------------

![](../resources/media/image2.png)
![](../resources/media/image10.png)

<div align="center"><strong>Figure 6 : overview of your settings</strong></div><br/>

This page summarizes previously selected settings: the columns that will be input for tagging and classification types. The page provides a duration time, which is an 
estimated value of how long it will take to tag a specific number of tokens. Clicking on Continue will bring the user to ([figure 7](#2-tagging-tool))

## 2. Tagging tool

### 2.1 SingleTokens
----------------

![](../resources/media/image19.png)

<div align="center"><strong>figure 7 : single tokens page</strong></div><br/>

The tagging tool is separated into two parts : the tagging section and
the summary one. The summary gets updated automatically when you're
tagging the current token. On the tagging section, you have the field
alias that you can use to rename a token at your convenience. You can
also click on any classification you think suits the best with the
token. You can also select synonyms which are basically misspellings of
the token. You can preview a few sentences on where the synonyms
appeared to get the context of use of these potential synonyms by
hovering over the icon
![](../resources/media/image7.png) on every synonym.

In figure 8, you can see the synonyms selected by a user. The selected
synonyms can be deselected if
needed.![](../resources/media/image20.png)

<div align="center"><strong>Figure 8 : single tokens with synonyms selected</strong></div><br/>

In figure 9, an alert message has appeared because the user clicked on
continue before selecting a
classification.![](../resources/media/image11.png)

<div align="center"><strong>Figure 9 : single tokens with alert message</strong></div><br/>

On the figure 10, you can see that the progress bar updates its value
right after every click on the continue button. This progress bar shows
the capacity of knowledge that the algorithms have on the data.
Basically, if you have a percentage of completeness of 40%, it means
that on 40% of the rows of the original file you have tagged at least
one token. ![](../resources/media/image21.png)

<div align="center"><strong>Figure 10 : progress bar updated</strong></div><br/>

On the summary section, you can see a series of 3 multi tokens in which
the single token you're currently tagging appeared in. This was made to
enable any user to navigate more easily from single to multi token. If
you click on the More button right below these three multi tokens, you
will be able to see a popup containing all the multi words that have the
single token you're working on.

### 2.2 Multi Tokens
----------------

![](../resources/media/image17.png)

<div align="center"><strong>Figure 11 : multi tokenpage</strong></div><br/>

The multi token page is very similar to the single token one. Let's
explain the two differences between them. First, in this page, you will
be able to classify the multi words with the hybrid classifications
explained previously on the classification section. Secondly, in the
summary, the section composed by is the exact reverse of the "appears
in" section of the single token page. It is made to make it easier to
navigate back and forth between single tokens and multi tokens.

### 2.3 Search tokens
-----------------

![](../resources/media/image18.png)

<div align="center"><strong>Figure 12 : search feature</strong></div><br/>

If you're looking for a specific token you can click on this icon
![](../resources/media/image1.png), it will display then figure 12's popup.
This popup is basically composed by a search bar in which you can type
the token you're looking for or you can choose to classify them by
alphabetical order to see figure 13 and then select the first letter of
your token and then, your token.

![](../resources/media/image14.png)

<div align="center"><strong>Figure 13 : search feature - alphabetical filter</strong></div><br/>

### 2.4 Save a project
------------------

![](../resources/media/image4.png)

<div align="center"><strong>Figure 14 : saving action</strong></div><br/>

When you're done choosing the headers settings and that you imported
data, you are now able to save your project in a local database
instance. The data you imported in this project will only remain in your
laptop and will be stored in the AppData directory. On the figure 14,
you can change the name of the project you are working on, and then
click on save to add it to your list of projects presented in the home
page. Default name will be the name of the file you uploaded.

## 3. Report
![](../resources/media/image5.png)

<div align="center"><strong>Figure 15 : report page</strong></div><br/>

This page is currently a quick summary of the situation of the project
opened. In this example, the user tagged 1 word with 9 synonyms
selected, which are located in 24.58% of the lines of the original file.
There are still 1766 potential tokens to tag.

## 4. Export

![](../resources/media/image12.png)

<div align="center"><strong>Figure 16 : export page</strong></div>

In this page, you are able to download some outputs of the application :

-   the output file : readable csv of the original data and the tokens
    > tagged.

-   The vocab file single words : list of the single tokens tagged
    > ranked by 'tf-idf' with their tag and their score.

-   The vocab file multi words : list of the multi word tokens tagged
    > ranked by 'tf-idf' with their tag and their score.

## 5. Other information

The Nestor application doesn't need any network connection and any
softwares already installed. All that is needed for the application is
already in it.

In a decent laptop with regular performances, the application doesn't
have any lag.

The storage capacity limit is currently set to the client's laptop
capacity. If you don't have storage left in your laptop, then you might
have some troubles saving a project in Nestor.
