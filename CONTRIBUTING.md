![](RackMultipart20200504-4-q4gq1e_html_4b9c09a676bd9fef.png)

# Nestor User Guide

Developed by

**Michael Brundage** : Principal Investigator

**Thurston Sexton** : Nestor Technical Lead

**Sakina Laanani** : Nestor developer (2018-2019)

**Cedric Bell** : Nestor developer (2019-2020)

**Summary**

**[Introduction](#_rqceq2v601oy) 3**

**[1. Settings](#_anm47mz8dfah) 4**

[1.1 Home](#_muea2q4gxng1) 4

[1.2 Manage projects](#_mxmswx9bilyw) 5

[1.3 Upload a file](#_1g1s0vch0v8d) 6

[1.4 Select columns](#_iw9mzha3moso) 7

[1.5 Classification](#_8a5bhnxw57km) 8

[1.6 Overview](#_30l2eez9yqid) 9

**[2. Tagging tool](#_4t5vv33bksp) 10**

[2.1 SingleTokens](#_hkl91lixp9u3) 10

[2.2 Multi Tokens](#_mqr0s79u28n2) 13

[2.3 Search tokens](#_dop8iefb2soe) 14

[2.4 Save a project](#_ka0lokggncgj) 15

**[3. Report](#_qcy34v6atx56) 17**

**[4. Export](#_76sofuv3hd79) 18**

**[5. Other information](#_r6iazmgzyny9) 19**

## Introduction

This user guide of the nestor application is addressed to all users who are going to interact with the application in order to give understanding to data sets that previously were too

unstructured or filled with jargon to analyze. This document&#39;s main focus is to explain how to use the application.

The Nestor application provides you the ability to import data from a csv file, and to tag the tokens which are the most representative ones, to enable you to have a clearer overview of the data you gave us in input. The goal of this application is to present with a more user friendly design the same features than in another [version](https://nestor.readthedocs.io/en/latest/index.html) previously released.

## 1. Settings

## 1.1 Home

![](RackMultipart20200504-4-q4gq1e_html_8f4e4293b34bdd4a.png)**figure 1 : Home page of Nestor (header in red)**

When you open the application, you will see a quick loading screen and then the figure 1 like above. During your use of the application, the header will remain the same and you can navigate to the tagging tool and the dashboard through that header. On this header, there is also a save button which will remain disabled unless you start a new project. Still in the header, you can also see the project&#39;s name you&#39;re currently working on. If you click on the new project button, you will be redirected to the upload page (figure 3). If you click on the manage projects button you will be prompted figure 2.

##


## 1.2 Manage projects

![](RackMultipart20200504-4-q4gq1e_html_89743ffd848b1a1c.png)

**figure 2 : Manage project popup**

This popup is opened when you click on the Manage projects button in the home page. On this popup, you can select one project from your projects list and then either open or delete it. When you delete one project, it&#39;s not going to be in your project list anymore. When you open a project, you will be redirected to the Overview tab (figure 6) with all the loaded settings and tagged tokens of your previous saving action. If you don&#39;t have any projects yet, you will be prompted to first create one in order to retrieve it in this modal later.

##


## 1.3 Upload a file

![](RackMultipart20200504-4-q4gq1e_html_7d3179bca18afeec.png)

**figure 3 : Upload a new file**

In this page, you can click on the &quot;select a file&quot; green button which is going to ask you to select a csv file from your laptop. When you upload a new file successfully, you will see the name of the file you just uploaded right below the green button. You can click on the start button to go to the figure 4 below.

##


## 1.4 Select columns

![](RackMultipart20200504-4-q4gq1e_html_c71c507616026978.png) **figure 4 : Select columns page**

In this tab, you have to select the columns you want to tag by clicking on them. The columns are basically the headers of the csv file you uploaded before. For now, users are strongly advised to select the columns of natural language in it. The algorithms are not yet strong enough to deal with only numbers or dates. Some improvements are under development to better handle the numbers as tokens. By hovering your mouse on the column&#39;s name, you will see tooltips to preview quickly what is in each column. When you&#39;re done selecting the columns to tag, you can click on Continue to see the figure 5.

## 1.5 Classification

## ![](RackMultipart20200504-4-q4gq1e_html_617691fe57133a78.png)

**Figure 5 : Classification explanation**

This page&#39;s role is to explain how you are supposed to tag the tokens you will see after the settings section. Basically, all the tokens can be regrouped into the concepts of item, solution, problem, unknown and non entity. Moreover, two hybrid classifications are available for the multiTokens : Object Fault which is basically a problem related to an item and an object resolution, which is a solution related to an item. You will see this explanations if you hover these elements ( ![](RackMultipart20200504-4-q4gq1e_html_4c878bde21ba991c.png) ). You can click on the continue button to be redirected to the overview tab (figure 6).

## 1.6 Overview

![](RackMultipart20200504-4-q4gq1e_html_248b4c4439211a18.png) ![](RackMultipart20200504-4-q4gq1e_html_a102af9ef76d59a2.png)

**Figure 6 : overview of your settings**

This page is making the summary of the settings chosen previously on your navigation : the columns or headers, the classification. There is also a duration section, whose goal is just to show you an estimated time of tagging process for a given number of tokens. After clicking on the continue button, you will now go to the tagging tool section. (figure 7)

## 2. Tagging tool

## 2.1 SingleTokens

![](RackMultipart20200504-4-q4gq1e_html_508584faf299d1c2.png)

**figure 7 : single tokens page**

The tagging tool is separated into two parts : the tagging section and the summary one. The summary gets updated automatically when you&#39;re tagging the current token. On the tagging section, you have the field alias that you can use to rename a token at your convenience. You can also click on any classification you think suits the best with the token. You can also select synonyms which are basically misspellings of the token. You can preview a few sentences on where the synonyms appeared to get the context of use of these potential synonyms by hovering over the icon ![](RackMultipart20200504-4-q4gq1e_html_7aa773851718b904.png) on every synonym.

In figure 8, you can see the synonyms selected by a user. The selected synonyms can be deselected if needed. ![](RackMultipart20200504-4-q4gq1e_html_5aa14eecf4e436ee.png)

**Figure 8 : single tokens with synonyms selected**

In figure 9, an alert message has appeared because the user clicked on continue before selecting a classification. ![](RackMultipart20200504-4-q4gq1e_html_d8ecceb3a274c530.png)

**Figure 9 : single tokens with alert message**

On the figure 10, you can see that the progress bar updates its value right after every click on the continue button. This progress bar shows the capacity of knowledge that the algorithms have on the data. Basically, if you have a percentage of completeness of 40%, it means that on 40% of the rows of the original file you have tagged at least one token. ![](RackMultipart20200504-4-q4gq1e_html_326d41ed3a54083f.png)

**Figure 10 : progress bar updated**

On the summary section, you can see a series of 3 multi tokens in which the single token you&#39;re currently tagging appeared in. This was made to enable any user to navigate more easily from single to multi token. If you click on the More button right below these three multi tokens, you will be able to see a popup containing all the multi words that have the single token you&#39;re working on.

## 2.2 Multi Tokens

![](RackMultipart20200504-4-q4gq1e_html_6d1cbe57626693c1.png)

**Figure 11 : multi tokenpage**

The multi token page is very similar to the single token one. Let&#39;s explain the two differences between them. First, in this page, you will be able to classify the multi words with the hybrid classifications explained previously on the classification section. Secondly, in the summary, the section composed by is the exact reverse of the &quot;appears in&quot; section of the single token page. It is made to make it easier to navigate back and forth between single tokens and multi tokens.

## 2.3 Search tokens

![](RackMultipart20200504-4-q4gq1e_html_468ac0aa4f6a7ece.png)

**Figure 12 : search feature**

If you&#39;re looking for a specific token you can click on this icon ![](RackMultipart20200504-4-q4gq1e_html_b614dbb08669cd88.png) , it will display then figure 12&#39;s popup. This popup is basically composed by a search bar in which you can type the token you&#39;re looking for or you can choose to classify them by alphabetical order to see figure 13 and then select the first letter of your token and then, your token.

![](RackMultipart20200504-4-q4gq1e_html_657308bb68f73855.png)

**Figure 13 : search feature - alphabetical filter**

## 2.4 Save a project

![](RackMultipart20200504-4-q4gq1e_html_16c5de1e803276bd.png)

**Figure 14 : saving action**

When you&#39;re done choosing the headers settings and that you imported data, you are now able to save your project in a local database instance. The data you imported in this project will only remain in your laptop and will be stored in the AppData directory. On the figure 14, you can change the name of the project you are working on, and then click on save to add it to your list of projects presented in the home page. Default name will be the name of the file you uploaded.

## 3. Report

![](RackMultipart20200504-4-q4gq1e_html_51e6da5890c1192.png)

**Figure 15 : report page**

This page is currently a quick summary of the situation of the project opened. In this example, the user tagged 1 word with 9 synonyms selected, which are located in 24.58% of the lines of the original file. There are still 1766 potential tokens to tag.

## 4. Export

![](RackMultipart20200504-4-q4gq1e_html_d4094fa2f9b08829.png)

**Figure 16 : export page**

In this page, you are able to download some outputs of the application :

- the output file : readable csv of the original data and the tokens tagged.
- The vocab file single words : list of the single tokens tagged ranked by &#39;tf-idf&#39; with their tag and their score.
- The vocab file multi words : list of the multi word tokens tagged ranked by &#39;tf-idf&#39; with their tag and their score.

## 5. Other information

The Nestor application doesn&#39;t need any network connection and any softwares already installed. All that is needed for the application is already in it.

In a decent laptop with regular performances, the application doesn&#39;t have any lag.

The storage capacity limit is currently set to the client&#39;s laptop capacity. If you don&#39;t have storage left in your laptop, then you might have some troubles saving a project in Nestor.

![](RackMultipart20200504-4-q4gq1e_html_237499165a11f2b9.gif) ![](RackMultipart20200504-4-q4gq1e_html_6524c2eacb56b809.png)