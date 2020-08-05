CREATE TABLE IF NOT EXISTS
locations (
  search_query VARCHAR(80) PRIMARY KEY NOT NULL,
  display_name VARCHAR(1000) NOT NULL,
  lat VARCHAR(25) NOT NULL,
  lon VARCHAR(25) NOT NULL,
  country_code VARCHAR(2) NOT NULL;
);

CREATE TABLE IF NOT EXISTS
weathers (
  city VARCHAR(80) PRIMARY KEY NOT NULL,
  forecast VARCHAR(80) NOT NULL,
  time timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS
trails (
  latitude VARCHAR(25) NOT NULL,
  longitude VARCHAR(25) NOT NULL,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  length float8 NOT NULL,
  stars INT NOT NULL,
  star_votes INT NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  trail_url VARCHAR(255) NOT NULL,
  conditions VARCHAR(255) NOT NULL,
  condition_date VARCHAR(10) NOT NULL,
  condition_time VARCHAR(10) NOT NULL,
  PRIMARY KEY (latitude, longitude)
);


## alter table locations add column country_code varchar(2) not null;
## alter table locations alter column display_name type varchar(1000);
