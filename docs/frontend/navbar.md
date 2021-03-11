## Classes

<dl>
<dt><a href="#NavBar">NavBar</a></dt>
<dd><p>Component for home page.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#links">links</a></dt>
<dd><p>constant of the links to home, tagging tool and dashboard page</p>
</dd>
</dl>

<a name="NavBar"></a>

## NavBar
Component for home page.

**Kind**: global class  
**Component**:   

* [NavBar](#NavBar)
    * [.handleChange](#NavBar+handleChange)
    * [.checkIfTagged](#NavBar+checkIfTagged) ⇒
    * [.handleDisplayProjectName](#NavBar+handleDisplayProjectName) ⇒
    * [.handleHideSuccessModal](#NavBar+handleHideSuccessModal)
    * [.handleShowSuccessModal](#NavBar+handleShowSuccessModal)
    * [.handleHideModal](#NavBar+handleHideModal)
    * [.handleShowModal](#NavBar+handleShowModal)
    * [.handleHideErrorModal](#NavBar+handleHideErrorModal)
    * [.handleShowErrorModal](#NavBar+handleShowErrorModal)
    * [.handleSaveProject](#NavBar+handleSaveProject)
    * [.componentDidUpdate()](#NavBar+componentDidUpdate)
    * [.shouldComponentUpdate(nextProps, nextState)](#NavBar+shouldComponentUpdate)
    * [.render()](#NavBar+render)

<a name="NavBar+handleChange"></a>

### navBar.handleChange
function called to set current project name after changing it through saving modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+checkIfTagged"></a>

### navBar.checkIfTagged ⇒
function to determine if save button has to be disabled or not

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
**Returns**: true if there are singleTokens in props  
<a name="NavBar+handleDisplayProjectName"></a>

### navBar.handleDisplayProjectName ⇒
function checking the length of the name of the projectand reduce it if it's too long

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
**Returns**: project name displayed format  
<a name="NavBar+handleHideSuccessModal"></a>

### navBar.handleHideSuccessModal
function called to hide the successfully save modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleShowSuccessModal"></a>

### navBar.handleShowSuccessModal
function called to show the successfully save modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleHideModal"></a>

### navBar.handleHideModal
function called to hide the saving modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleShowModal"></a>

### navBar.handleShowModal
function called to show the saving modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleHideErrorModal"></a>

### navBar.handleHideErrorModal
function called to hide the error while saving modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleShowErrorModal"></a>

### navBar.handleShowErrorModal
function called to show the error while saving modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+handleSaveProject"></a>

### navBar.handleSaveProject
function called to save the project currently openedIt creates a project object and store all the current props in itand then save this object into the database.Then it displays either the success or the error modal

**Kind**: instance property of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+componentDidUpdate"></a>

### navBar.componentDidUpdate()
A react lifecycle method called when the component did update.It checks if the dragAndDrops props changed and set state with right project Name and also disable the save button if needed

**Kind**: instance method of [<code>NavBar</code>](#NavBar)  
<a name="NavBar+shouldComponentUpdate"></a>

### navBar.shouldComponentUpdate(nextProps, nextState)
A react lifecycle method to determine whether or not the component should updateIt checks if the dragAndDrops changed and return true if it changed

**Kind**: instance method of [<code>NavBar</code>](#NavBar)  

| Param | Type | Description |
| --- | --- | --- |
| nextProps | <code>props</code> | the new props of the application |
| nextState | <code>props</code> | the next state of the component |

<a name="NavBar+render"></a>

### navBar.render()
The render function.

**Kind**: instance method of [<code>NavBar</code>](#NavBar)  
<a name="links"></a>

## links
constant of the links to home, tagging tool and dashboard page

**Kind**: global constant  
