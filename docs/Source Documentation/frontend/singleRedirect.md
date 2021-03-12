<a name="SingleRedirect"></a>

## SingleRedirect
Component for redirecting single tokens.

**Kind**: global class  
**Component**:   

* [SingleRedirect](#SingleRedirect)
    * [.handleContinue](#SingleRedirect+handleContinue)
    * [.componentDidUpdate()](#SingleRedirect+componentDidUpdate)
    * [.componentDidMount()](#SingleRedirect+componentDidMount)
    * [.render()](#SingleRedirect+render)

<a name="SingleRedirect+handleContinue"></a>

### singleRedirect.handleContinue
function which hhandle showing or not an alert about single tokens redirectionsand also check where to redirect the user when clicking on continue

**Kind**: instance property of [<code>SingleRedirect</code>](#SingleRedirect)  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>history</code> | History of navigation |

<a name="SingleRedirect+componentDidUpdate"></a>

### singleRedirect.componentDidUpdate()
A react lifecycle method called when the component did update.if single tokens props changed, execute handleContinue to set the first token.

**Kind**: instance method of [<code>SingleRedirect</code>](#SingleRedirect)  
<a name="SingleRedirect+componentDidMount"></a>

### singleRedirect.componentDidMount()
A react lifecycle method called when the component did mount.execute handleContinue to set the first token.

**Kind**: instance method of [<code>SingleRedirect</code>](#SingleRedirect)  
<a name="SingleRedirect+render"></a>

### singleRedirect.render()
The render function.

**Kind**: instance method of [<code>SingleRedirect</code>](#SingleRedirect)  
