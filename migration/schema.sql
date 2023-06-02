-- Create the "notes" table
CREATE TABLE notes (
                       id SERIAL PRIMARY KEY,         -- Primary key of the notes table
                       content TEXT,                  -- Content of the note
                       last_updated TIMESTAMP,        -- Timestamp of when the note was last updated
                       CONSTRAINT idx_notes_last_updated UNIQUE (last_updated)
);

-- Create the "source_types" table
CREATE TABLE source_types (
                              id SERIAL PRIMARY KEY,          -- Primary key of the source_types table
                              name VARCHAR(255) UNIQUE        -- Unique name of the source type
);

-- Create the "sources" table
CREATE TABLE sources (
                         id SERIAL PRIMARY KEY,              -- Primary key of the sources table
                         note_id INT REFERENCES notes(id) ON DELETE CASCADE,   -- Foreign key referencing the notes table
                         source_type_id INT REFERENCES source_types(id) ON DELETE CASCADE, -- Foreign key referencing the source_types table
                         value VARCHAR(255),                 -- Value associated with the source
                         CONSTRAINT fk_note_id FOREIGN KEY (note_id) REFERENCES notes(id), -- Foreign key constraint for note_id
                         CONSTRAINT fk_source_type_id FOREIGN KEY (source_type_id) REFERENCES source_types(id) -- Foreign key constraint for source_type_id
);



-- Create index on name in source_types table
CREATE INDEX idx_source_types_name ON source_types(name);

-- Create composite index on source_type_id and value in sources table
CREATE INDEX idx_sources_source_type_value ON sources(source_type_id, value);
