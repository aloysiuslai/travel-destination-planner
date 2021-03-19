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

CREATE TABLE searchHistory (
  id SERIAL,
  code varchar(50),
  city varchar(50),
  country varchar(50),
  date varchar(50),
  link varchar(500)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

--  copy code (code, city, country) FROM '/users/aloysiuslai/travel-destination-planner/airports.csv' DELIMITER ',' CSV HEADER;

-- INSERT into searchHistory (code, city, country, date, link) VALUES ('BCN', 'Barcelona', 'Spain', '2020-06-12', 'https://www.tripadvisor.com/CheapFlightsSearchResults-a_airport0.SFO-a_airport1.BCN-a_cos.0-a_date0.20200612-a_nearby0.no-a_nearby1.no-a_nonstop.no-a_pax0.a-a_travelers.1');