<a name="HomeComponent"></a>

## HomeComponent
Component for home page.

**Kind**: global class  
**Component**:   

* [HomeComponent](#HomeComponent)
    * [.handleHideModal](#HomeComponent+handleHideModal)
    * [.handleShowModal](#HomeComponent+handleShowModal)
    * [.clearApplicationState](#HomeComponent+clearApplicationState)
    * [.newProject](#HomeComponent+newProject)
    * [.componentDidMount()](#HomeComponent+componentDidMount)
    * [.render()](#HomeComponent+render)
    * [.handleDeleteProject(projectName)](#HomeComponent+handleDeleteProject)
    * [.handleOpenProject(projectName)](#HomeComponent+handleOpenProject)

<a name="HomeComponent+handleHideModal"></a>

### homeComponent.handleHideModal
function called to hide the projects list modal

**Kind**: instance property of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+handleShowModal"></a>

### homeComponent.handleShowModal
function called to show the projects list modal

**Kind**: instance property of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+clearApplicationState"></a>

### homeComponent.clearApplicationState
function called to clear the state of the applicationBasically, it resets all the props to null, among dragAndDrops,singleTokens, multiTokens, headers, tokensNumber, and call the function clearAllattribute from the python script which reset theglobal variables to empty in the script.

**Kind**: instance property of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+newProject"></a>

### homeComponent.newProject
function called to create a new projectclear the application state and redirect to upload page

**Kind**: instance property of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+componentDidMount"></a>

### homeComponent.componentDidMount()
A react lifecycle method called when the component did mount.It loads the list of projects from the database

**Kind**: instance method of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+render"></a>

### homeComponent.render()
The render function.

**Kind**: instance method of [<code>HomeComponent</code>](#HomeComponent)  
<a name="HomeComponent+handleDeleteProject"></a>

### homeComponent.handleDeleteProject(projectName)
function called to delete a projectIt deletes the project from the databaseand clears the state of the python script ifthe deleted project was currently opened

**Kind**: instance method of [<code>HomeComponent</code>](#HomeComponent)  

| Param | Type | Description |
| --- | --- | --- |
| projectName | <code>string</code> | project name to be deleted |

<a name="HomeComponent+handleOpenProject"></a>

### homeComponent.handleOpenProject(projectName)
function called to open a project from the listIt hides the modal, and then load the project from the databaseand set all the props to the values retrieved from the database.It also redirect to the overview page

**Kind**: instance method of [<code>HomeComponent</code>](#HomeComponent)  

| Param | Type | Description |
| --- | --- | --- |
| projectName | <code>string</code> | project name to be opened |

