<a name="SingleWord"></a>

## SingleWord
Component for single word page.

**Kind**: global class  
**Component**:   

* [SingleWord](#SingleWord)
    * [.handleDelete](#SingleWord+handleDelete)
    * [.componentDidMount()](#SingleWord+componentDidMount)
    * [.shouldComponentUpdate(nextProps)](#SingleWord+shouldComponentUpdate) ⇒
    * [.componentDidUpdate()](#SingleWord+componentDidUpdate)
    * [.render()](#SingleWord+render)
    * [.handleBack()](#SingleWord+handleBack)
    * [.handleClickOnMultiToken(token)](#SingleWord+handleClickOnMultiToken)
    * [.handleClickList(token)](#SingleWord+handleClickList)
    * [.handleContinue()](#SingleWord+handleContinue)
    * [.showMoreOrLess()](#SingleWord+showMoreOrLess)
    * [.handleHideNoClassificationAlert()](#SingleWord+handleHideNoClassificationAlert)
    * [.handleDeleteModal()](#SingleWord+handleDeleteModal)
    * [.handleShowModal()](#SingleWord+handleShowModal)
    * [.updateValue(event)](#SingleWord+updateValue)
    * [.handleAddClassification(classificationTag)](#SingleWord+handleAddClassification)
    * [.handleToggle()](#SingleWord+handleToggle)
    * [.handleChangeNote(event)](#SingleWord+handleChangeNote)
    * [.handleDeleteSynonym(synonym)](#SingleWord+handleDeleteSynonym)
    * [.handleSelectSynonym(synonym)](#SingleWord+handleSelectSynonym)
    * [.refreshSynonyms()](#SingleWord+refreshSynonyms)
    * [.computeSynonyms()](#SingleWord+computeSynonyms)
    * [.initTokenWithSynonymAlias()](#SingleWord+initTokenWithSynonymAlias)

<a name="SingleWord+handleDelete"></a>

### singleWord.handleDelete
function to hide the alert message when no single tokens

**Kind**: instance property of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+componentDidMount"></a>

### singleWord.componentDidMount()
A react lifecycle method called when the component did mount.It inits the single word tokens with the appropriate alias and alsoget the completeness of the project to update the progress bar, and updatethe alert if needed

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+shouldComponentUpdate"></a>

### singleWord.shouldComponentUpdate(nextProps) ⇒
A react lifecycle method to determine whether or not the component should update

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
**Returns**: true if single tokens props changed or if the search modaldisplay has changed  

| Param | Type | Description |
| --- | --- | --- |
| nextProps | <code>props</code> | the new props of the application |

<a name="SingleWord+componentDidUpdate"></a>

### singleWord.componentDidUpdate()
A react lifecycle method called when the component did update.Checks whether the props match.id changed and init tokens with appropriate alias, get the completeness of the project,and update the vocab of single grams, and also sets the synonymsfor each singleToken

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+render"></a>

### singleWord.render()
The render function.

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleBack"></a>

### singleWord.handleBack()
function called when clicking on the back to multi Token buttonit reset the history of singletokens to empty and then redirect to multitokens

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleClickOnMultiToken"></a>

### singleWord.handleClickOnMultiToken(token)
function when clicked on a multi token in the composed by sectionit update the multiToken History with current path in the applicationand redirect to the multi token clicked on

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>token</code> | The multi word token token clicked on |

<a name="SingleWord+handleClickList"></a>

### singleWord.handleClickList(token)
function called when clicking on a single word token It hides the search modal and redirect to the single token clicked

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>token</code> | the token clicked on in the search modal |

<a name="SingleWord+handleContinue"></a>

### singleWord.handleContinue()
function called when clicking on the continue buttonit checks if a classification has been selected and then redirect to the next multi token in the list ranked by tf-idf

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+showMoreOrLess"></a>

### singleWord.showMoreOrLess()
function called when clicked on More buttonIt basically show or hide the modal of all themulti word tokens where the current single word tokenappeared in

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleHideNoClassificationAlert"></a>

### singleWord.handleHideNoClassificationAlert()
function that hide the alert message when trying to continuewithout classification selected

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleDeleteModal"></a>

### singleWord.handleDeleteModal()
function to hide modal of search among between single words

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleShowModal"></a>

### singleWord.handleShowModal()
function to show the modal of search among all the single words

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+updateValue"></a>

### singleWord.updateValue(event)
function to update the the value of the alias of the current single word token

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>event</code> | the event generated when typing in the alias form field |

<a name="SingleWord+handleAddClassification"></a>

### singleWord.handleAddClassification(classificationTag)
function to add a classification to the current single word

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| classificationTag | <code>classificationTag</code> | The classification of the single word |

<a name="SingleWord+handleToggle"></a>

### singleWord.handleToggle()
function to toggle the text area of the note of the current single word token

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+handleChangeNote"></a>

### singleWord.handleChangeNote(event)
function to change the texte of the note

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>event</code> | event generated automatically when typing in the typing area |

<a name="SingleWord+handleDeleteSynonym"></a>

### singleWord.handleDeleteSynonym(synonym)
function to remove a synonym from the selected synonyms

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| synonym | <code>token</code> | the synonym to remove |

<a name="SingleWord+handleSelectSynonym"></a>

### singleWord.handleSelectSynonym(synonym)
function to add a synonym to the selected synonyms

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  

| Param | Type | Description |
| --- | --- | --- |
| synonym | <code>token</code> | the synonym to add |

<a name="SingleWord+refreshSynonyms"></a>

### singleWord.refreshSynonyms()
function to get and set all the tooltips of the synonyms of thecurrent single Token

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+computeSynonyms"></a>

### singleWord.computeSynonyms()
function to set the synonyms of every single word token

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
<a name="SingleWord+initTokenWithSynonymAlias"></a>

### singleWord.initTokenWithSynonymAlias()
function to init all the singletokens with the appropriate alias,basically their label, and also set the list of multi tokens which are composed by thecurrent single word and another single word token

**Kind**: instance method of [<code>SingleWord</code>](#SingleWord)  
