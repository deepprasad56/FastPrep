# 📂 React File Explorer

This project implements a **recursive file explorer** in React, where you can:

- Create folders
- Create files
- Expand/collapse folders
- Delete nodes (files/folders)

It uses **React functional components**, **hooks (`useState`)**, and **recursion** for rendering nested structures.

---

## 🚀 Features

1. **Recursive Rendering**
   - The `FileList` component renders itself recursively for nested folders.

2. **Expand/Collapse**
   - Clicking a folder toggles its expanded state using `isExpand` state.

3. **Selection**
   - Tracks the selected node with `selectedn` state.

4. **Dynamic Tree Updates**
   - Add files or folders dynamically with `cfhandler` (create folder) and `cffhandler` (create file).
   - Delete nodes with `delhandler`.

5. **Immutable Updates**
   - Tree is updated immutably (new objects created instead of mutating state directly).

---


---

## 🔑 Key Components

### 1. `FileList` Component
```jsx
import { useState } from 'react';
import json from './data.json'

function FileList({ fdata, nhandler, selectedn, isExpand ,delhandler}) {





  return (
    <>
      <div className='file_c'>
        {
          fdata.map((node) => {
            return (
              <div className='node'>
                <span className='node_name' style={
                  {
                    color: selectedn === node?.id && node?.isFolder ? "white" : "black",
                  }
                } onClick={() => nhandler(node.name, node.id)}>{node?.isFolder ? "+ " : " "}{node?.name}</span> <span onClick={()=>delhandler(node?.id)}> Delete</span>
                {isExpand?.[node?.name] && node?.isFolder && <FileList fdata={node?.children} nhandler={nhandler} selectedn={selectedn} isExpand={isExpand} delhandler={delhandler} />}
              </div>

            )
          })

        }
      </div>
    </>
  )
}
export default function App() {

  let [data, setData] = useState(json)
  let [selectedn, setselectedn] = useState()
  let [isExpand, setisExpand] = useState({})
  let nhandler = (name, id) => {
    setisExpand((prev) => {
      return (
        { ...prev, [name]: !prev[name] }
      )
    })
    setselectedn((prev) => prev = id)
  }

  let updatetree = (list, nf, id) => {
    if(!id) return [...list,nf]
    return list.map((n) => {
      if (n.id == id) {
        return ({
          ...n,
          children: [
            ...n.children,
            nf]
        })
      }
      if (n.children) {
        return {
          ...n, children: updatetree(n.children)
        }
      }
      
     
      return n
    })
  }

 

  let cfhandler = (id) => {
     let name=prompt('Enter Folder Name')
    let nf = {
      "id": 222,
      "name": name,
      "isFolder": true,
      "children": [
        {
          "id": 333,
          "name": "test2",
          "isFolder": false,
        }
      ]
    }

    




    setData((prev) => updatetree(prev,nf,id))


  }

  let cffhandler = (id) => {
    let name = prompt('Enter File Name')
    let nf = {
      "id": 222,
      "name": name,
      "isFolder": false,
    }





    setData((prev) => updatetree(prev, nf, id))


  }
  let deletetree = (list,id) => {
    return list.filter((n) => n.id!=id ).map((n) => {
      if (n.children) {
        return {...n,children:deletetree(n.children,id)}
      }
      return n
    })
  }


  let delhandler = (id) => {
    setData((prev)=>deletetree(prev,id))
  }
  return (

    <>
      <h1>File Explorer</h1>
      <button onClick={() => cfhandler(selectedn)} >Create Folder</button>
      <button onClick={() => cffhandler(selectedn)}>Create File</button>
      <FileList fdata={data} nhandler={nhandler} selectedn={selectedn} isExpand={isExpand} delhandler={delhandler} />
    </>

  )
}
```
