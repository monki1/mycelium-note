![Database Schema](https://github.com/monki1/mycelium-note/blob/a5848efe145306a818e66aa96465ecfcb7c98074/docs/ERD.png)

- #### Concepts
  - Note: a String
  - Source: extracted data from note
  - __Example__:
    - "This is a note with source: \<type1:value1>."
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


