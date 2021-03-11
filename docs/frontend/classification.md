<a name="Classification"></a>

## Classification
Component for Classification page.

**Kind**: global class  
**Component**:   

* [Classification](#Classification)
    * [.componentDidMount()](#Classification+componentDidMount)
    * [.componentDidUpdate()](#Classification+componentDidUpdate)
    * [.render()](#Classification+render)
    * [.updateClassification()](#Classification+updateClassification)
    * [.handleDelete()](#Classification+handleDelete)
    * [.handleContinue()](#Classification+handleContinue)

<a name="Classification+componentDidMount"></a>

### classification.componentDidMount()
A react lifecycle method called when the component did mount.It gets the classification rules and types from the python script, checks whether or not to display an alertand then request the singleTokens and the multiTokens

**Kind**: instance method of [<code>Classification</code>](#Classification)  
<a name="Classification+componentDidUpdate"></a>

### classification.componentDidUpdate()
A react lifecycle method called when the component did update.It checks if the singleTokens props has changed and then get the tokens number with the new singleTokens.

**Kind**: instance method of [<code>Classification</code>](#Classification)  
<a name="Classification+render"></a>

### classification.render()
The render function.

**Kind**: instance method of [<code>Classification</code>](#Classification)  
<a name="Classification+updateClassification"></a>

### classification.updateClassification()
function that update the component's state classificationto basically display the explanations of the hybrids classificationscomposition

**Kind**: instance method of [<code>Classification</code>](#Classification)  
<a name="Classification+handleDelete"></a>

### classification.handleDelete()
function that hide the alert message

**Kind**: instance method of [<code>Classification</code>](#Classification)  
<a name="Classification+handleContinue"></a>

### classification.handleContinue()
function that redirect to the overview tab if the alert is not active

**Kind**: instance method of [<code>Classification</code>](#Classification)  
