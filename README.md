![Database Schema](https://github.com/monki1/mycelium-note/blob/a5848efe145306a818e66aa96465ecfcb7c98074/docs/ERD.png)

- #### Concepts
  - Note: a String
  - Source: extracted data from note
  - __Example__:
    
```js
const noteStrings = [
"Task: <todo:0>",
"Meeting on <date:2023-06-02>",
"Project deadline: <deadline:2023-07-14>",
"Feeling: <mood:happy>",
"Title: <title:restify-js>",
"Recipe: <ingredient:flour> <ingredient:sugar> <ingredient:egg>",
"Status: <status:in-progress>",
"Another related note: <noteID:8080>",
];

```
  - __Query__:
    - ```js
      const conditions = [
      { sourceTypeName: 'Type1', sourceValue: 'Value1', operator: '=' },
      { sourceTypeName: 'Type2', sourceValue: 'Value2', operator: '>' },
      ];
      query(conditions);
      // return all notes with source type1 = value1 and source type2 > value2
      ```

- #### Data Structure
  - Note: 
    - id : unique INT
    - content: TEXT
    - sources: \[ Source ]
  - Source: 
    - type: VARCHAR(255)
    - value: VARCHAR


