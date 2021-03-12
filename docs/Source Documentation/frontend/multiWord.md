<a name="MultiWord"></a>

## MultiWord
Component for multi word page.

**Kind**: global class  
**Component**:   

* [MultiWord](#MultiWord)
    * [.componentDidMount()](#MultiWord+componentDidMount)
    * [.shouldComponentUpdate(nextProps)](#MultiWord+shouldComponentUpdate) ⇒
    * [.componentDidUpdate()](#MultiWord+componentDidUpdate)
    * [.render()](#MultiWord+render)
    * [.handleBack()](#MultiWord+handleBack)
    * [.handleClickOnSingleToken(token)](#MultiWord+handleClickOnSingleToken)
    * [.handleClickList(token)](#MultiWord+handleClickList)
    * [.handleContinue()](#MultiWord+handleContinue)
    * [.handleHideNoClassificationAlert()](#MultiWord+handleHideNoClassificationAlert)
    * [.handleDeleteModal()](#MultiWord+handleDeleteModal)
    * [.handleShowModal()](#MultiWord+handleShowModal)
    * [.updateValue(event)](#MultiWord+updateValue)
    * [.handleAddClassification(classificationTag)](#MultiWord+handleAddClassification)
    * [.handleToggle()](#MultiWord+handleToggle)
    * [.handleChangeNote(event)](#MultiWord+handleChangeNote)
    * [.initTokenWithSynonymAlias()](#MultiWord+initTokenWithSynonymAlias)

<a name="MultiWord+componentDidMount"></a>

### multiWord.componentDidMount()
A react lifecycle method called when the component did mount.It inits the multi word tokens with the appropriate alias and alsoget the completeness of the project to update the progress bar

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+shouldComponentUpdate"></a>

### multiWord.shouldComponentUpdate(nextProps) ⇒
A react lifecycle method to determine whether or not the component should update

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
**Returns**: true if multi tokens props changed or if the search modaldisplay has changed  

| Param | Type | Description |
| --- | --- | --- |
| nextProps | <code>props</code> | the new props of the application |

<a name="MultiWord+componentDidUpdate"></a>

### multiWord.componentDidUpdate()
A react lifecycle method called when the component did update.Checks whether the props match.id changed and init tokens with appropriate alias, get the completeness of the project,and update the vocab of multi grams.

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+render"></a>

### multiWord.render()
The render function.

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleBack"></a>

### multiWord.handleBack()
function called when clicking on the back to single Token buttonit reset the history of multitokens to empty and then redirect to singleTokens

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleClickOnSingleToken"></a>

### multiWord.handleClickOnSingleToken(token)
function when clicked on a single token in the composed by sectionit update the singleToken History with current path in the applicationand redirect to the single token clicked on

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>token</code> | The single word token clicked on Back to single token button |

<a name="MultiWord+handleClickList"></a>

### multiWord.handleClickList(token)
function called when clicking on a multi word token It hides the search modal and redirect to the multi token clicked

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>token</code> | the token clicked on in the search modal |

<a name="MultiWord+handleContinue"></a>

### multiWord.handleContinue()
function called when clicking on the continue buttonit checks if a classification has been selected and then redirect to the next multi token in the list ranked by tf-idf

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleHideNoClassificationAlert"></a>

### multiWord.handleHideNoClassificationAlert()
function that hide the alert message when trying to continuewithout classification selected

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleDeleteModal"></a>

### multiWord.handleDeleteModal()
function to hide modal of search among between multi words

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleShowModal"></a>

### multiWord.handleShowModal()
function to show the modal of search among all the multi words

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+updateValue"></a>

### multiWord.updateValue(event)
function to update the the value of the alias of the current multiToken

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>event</code> | the event generated when typing in the alias form field |

<a name="MultiWord+handleAddClassification"></a>

### multiWord.handleAddClassification(classificationTag)
function to add a classification to the current multi word

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  

| Param | Type | Description |
| --- | --- | --- |
| classificationTag | <code>classificationTag</code> | The classification of the multi word |

<a name="MultiWord+handleToggle"></a>

### multiWord.handleToggle()
function to toggle the text area of the note of the current multi word

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
<a name="MultiWord+handleChangeNote"></a>

### multiWord.handleChangeNote(event)
function to change the texte of the note

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>event</code> | event generated automatically when typing in the typing area |

<a name="MultiWord+initTokenWithSynonymAlias"></a>

### multiWord.initTokenWithSynonymAlias()
function to init all the multitokens with the appropriate alias,basically their label, and also set the single tokens which composed thecurrent multi word

**Kind**: instance method of [<code>MultiWord</code>](#MultiWord)  
