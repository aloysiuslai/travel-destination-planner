DROP DATABASE IF EXISTS airports;

CREATE DATABASE airports;
grant all privileges on database airports to postgres;
\c airports



CREATE TABLE code (
  id SERIAL,
  code varchar(50),
  city varchar(50),
  country varchar(50)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

--  copy code (code, city, country) FROM '/users/aloysiuslai/hrsf127-mvp-starter/airports.csv' DELIMITER ',' CSV HEADER;

