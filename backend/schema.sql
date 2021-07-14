CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(200) NOT NULL,
  last_name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS events (
  event_id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  description VARCHAR(1000)
);

CREATE TABLE IF NOT EXISTS users_events (
  user_event_id SERIAL PRIMARY KEY,
  event_id SERIAL REFERENCES events,
  user_id SERIAL REFERENCES users
);

-- Test data
-- INSERT INTO users (first_name, last_name, email) VALUES ('Nicholas', 'Cheng', 'nchengyeeshen@gmail.com');
-- INSERT INTO users (first_name, last_name, email) VALUES ('John', 'Doe', 'john.doe@gmail.com');
-- INSERT INTO events (name, start_time, end_time) VALUES ('Event #1', '1970-01-01 00:00:00', '1970-01-01 01:00:00');
-- INSERT INTO events (name, start_time, end_time) VALUES ('Event #2', '1970-01-01 00:00:00', '1970-01-01 01:00:00');
-- INSERT INTO users_events (event_id, user_id) VALUES (1, 1);
-- INSERT INTO users_events (event_id, user_id) VALUES (2, 2);