<a name="Headers"></a>

## Headers
Component for headers page.

**Kind**: global class  
**Component**:   

* [Headers](#Headers)
    * [.componentDidMount()](#Headers+componentDidMount)
    * [.render()](#Headers+render)
    * [.handleDelete()](#Headers+handleDelete)
    * [.handleContinue()](#Headers+handleContinue)
    * [.handleCheck(header)](#Headers+handleCheck)

<a name="Headers+componentDidMount"></a>

### headers.componentDidMount()
A react lifecycle method called when the component did mount.It update whether or not to display an alertand request the python script to get the headers to displayor update them if props already have headers

**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+render"></a>

### headers.render()
The render function.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+handleDelete"></a>

### headers.handleDelete()
function to hide the alert.

**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+handleContinue"></a>

### headers.handleContinue()
function that redirect to the classification pageafter a few checks

**Kind**: instance method of [<code>Headers</code>](#Headers)  
<a name="Headers+handleCheck"></a>

### headers.handleCheck(header)
function that update the headers in props when a header has been checked by the user

**Kind**: instance method of [<code>Headers</code>](#Headers)  

| Param | Type | Description |
| --- | --- | --- |
| header | <code>header</code> | the header selected |

