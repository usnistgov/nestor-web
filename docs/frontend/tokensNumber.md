<a name="TokensNumber"></a>

## TokensNumber
Component for tokensNumber page.

**Kind**: global class  
**Component**:   

* [TokensNumber](#TokensNumber)
    * [.componentDidUpdate()](#TokensNumber+componentDidUpdate)
    * [.componentDidMount()](#TokensNumber+componentDidMount)
    * [.render()](#TokensNumber+render)
    * [.handleDelete()](#TokensNumber+handleDelete)
    * [.handleUpdate(e)](#TokensNumber+handleUpdate)
    * [.handleContinue()](#TokensNumber+handleContinue)

<a name="TokensNumber+componentDidUpdate"></a>

### tokensNumber.componentDidUpdate()
A react lifecycle method called when the component did update.It checks if the singleTokens props has changed andthen get the tokens number to set it in the props

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  
<a name="TokensNumber+componentDidMount"></a>

### tokensNumber.componentDidMount()
A react lifecycle method called when the component did mount.it show or hide the alert message.

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  
<a name="TokensNumber+render"></a>

### tokensNumber.render()
The render function.

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  
<a name="TokensNumber+handleDelete"></a>

### tokensNumber.handleDelete()
function that hide the alert message section

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  
<a name="TokensNumber+handleUpdate"></a>

### tokensNumber.handleUpdate(e)
function that update the value of the tokens NUmber propson the change in the dynamic slider

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | event triggered when changing the slider value |

<a name="TokensNumber+handleContinue"></a>

### tokensNumber.handleContinue()
function that redirects to the overview

**Kind**: instance method of [<code>TokensNumber</code>](#TokensNumber)  
