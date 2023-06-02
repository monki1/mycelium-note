![Database Schema](https://github.com/monki1/mycelium-note/blob/a5848efe145306a818e66aa96465ecfcb7c98074/docs/ERD.png)

- #### Concepts
  - Note: a String
  - Source: extracted data from note
- __Example__:
    
```js
const noteStrings = [
  "Another related note: <noteID:8080>",
  "Task: <todo:0>",
  "Meeting on <date:2023-06-02>",
  "Project deadline: <deadline:2023-07-14>",
  "Feeling: <mood:happy>",
  "Title: <title:restify-js>",
  "Recipe: <ingredient:flour> <ingredient:sugar> <ingredient:egg>",
  "Status: <status:in-progress>",
];

```
  - __Query__ (pseudo code):
```js
const conditions = [
  { sourceTypeName: 'ingredient', sourceValue: 'flour', operator: '=' },
  { sourceTypeName: 'ingredient', sourceValue: 'sugar', operator: '=' },
  { sourceTypeName: 'ingredient', sourceValue: 'egg', operator: '=' },
];
query(conditions);
// return all notes with the ingredients flour, sugar, and egg
// [ {id: XXX, content: "Recipe: <ingredient:flour> <ingredient:sugar> <ingredient:egg>" } ]
```
  - __Result__:
```js
```

- #### Data Structure
  - Note: 
    - id : unique INT
    - content: TEXT
    - sources: \[ Source ]
  - Source: 
    - type: VARCHAR(255)
    - value: VARCHAR


