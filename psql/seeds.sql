-- Insert sample data into the "users" table
INSERT INTO users (username, password)
VALUES ('user1', 'password1'),
       ('user2', 'password2'),
       ('user3', 'password3');

-- Insert sample data into the "notes" table
INSERT INTO notes (user_id, content)
VALUES (1, 'Note content 1'),
       (2, 'Note content 2'),
       (3, 'Note content 3');

-- Insert sample data into the "tag_types" table
INSERT INTO tag_types (type)
VALUES ('Type A'),
       ('Type B'),
       ('Type C');

-- Insert sample data into the "tags" table
INSERT INTO tags (note_id, tag_type_id, user_id, value)
VALUES (1, 1, 1, 'Tag 1'),
       (2, 1, 2, 'Tag 2'),
       (3, 2, 3, 'Tag 3');
