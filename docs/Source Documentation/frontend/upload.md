<a name="Upload"></a>

## Upload
Component for upload page.

**Kind**: global class  
**Component**:   

* [Upload](#Upload)
    * [.componentDidMount()](#Upload+componentDidMount)
    * [.render()](#Upload+render)
    * [.handleFiles(files)](#Upload+handleFiles)
    * [.handleAddFile(dragAndDrop, e)](#Upload+handleAddFile)

<a name="Upload+componentDidMount"></a>

### upload.componentDidMount()
A react lifecycle method called when the component did mount.It initialize the dragAndDrops props

**Kind**: instance method of [<code>Upload</code>](#Upload)  
<a name="Upload+render"></a>

### upload.render()
The render function.

**Kind**: instance method of [<code>Upload</code>](#Upload)  
<a name="Upload+handleFiles"></a>

### upload.handleFiles(files)
function that handle the upload of a new file

**Kind**: instance method of [<code>Upload</code>](#Upload)  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>Array.&lt;file&gt;</code> | an array of file type uploaded |

<a name="Upload+handleAddFile"></a>

### upload.handleAddFile(dragAndDrop, e)
function that handle adding a file, updating the props

**Kind**: instance method of [<code>Upload</code>](#Upload)  

| Param | Type | Description |
| --- | --- | --- |
| dragAndDrop | <code>dragAndDrop</code> |  |
| e | <code>event</code> | event triggered when adding a file |

