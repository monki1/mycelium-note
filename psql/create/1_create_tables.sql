--Create the "users" table
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,         -- Primary key of the users table
                       username VARCHAR(255) UNIQUE,  -- Unique username of the user
                       password VARCHAR(255)          -- Password of the user
);

-- Create the "notes" table
CREATE TABLE notes (
                       id SERIAL PRIMARY KEY,
                       user_id INT REFERENCES users(id) ON DELETE CASCADE,
                       content TEXT,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Set the default value to the current timestamp

);


-- Create the "tag_types" table
CREATE TABLE tag_types (
                              id SERIAL PRIMARY KEY,          -- Primary key of the tag_types table
                              type VARCHAR(255) UNIQUE        -- Unique name of the tag type
);

-- Create the "tags" table
CREATE TABLE tags (
                         id SERIAL PRIMARY KEY,                                                          -- Primary key of the tags table
                         note_id INT REFERENCES notes(id) ON DELETE CASCADE,                             -- Foreign key referencing the notes table
                         tag_type_id INT REFERENCES tag_types(id) ON DELETE CASCADE,                   -- Foreign key referencing the tag_types table
                         user_id INT REFERENCES users(id) ON DELETE CASCADE,                             -- Foreign key referencing the users table
                         value VARCHAR(255),                                                             -- Value associated with the tag
                         CONSTRAINT fk_note_id FOREIGN KEY (note_id) REFERENCES notes(id),               -- Foreign key constraint for note_id
                         CONSTRAINT fk_tag_type_id FOREIGN KEY (tag_type_id) REFERENCES tag_types(id) -- Foreign key constraint for tag_type_id
);

-- serial id, long string token, timestamp expiration
CREATE TABLE secrets (
                            id SERIAL PRIMARY KEY,                                                          -- Primary key of the tags table
                            user_id INT REFERENCES users(id) ON DELETE CASCADE,                             -- Foreign key referencing the notes table
                            token VARCHAR(2047) UNIQUE,                                                             -- Value associated with the tag
                            create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Set the default value to the current timestamp
);


-- Create index on name in tag_types table
CREATE INDEX idx_tag_types_type ON tag_types(type);

-- Create composite index on tag_type_id and value in tags table
CREATE INDEX idx_tags_tag_type_value ON tags(tag_type_id, value);
