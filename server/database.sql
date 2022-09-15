CREATE DATABASE pancakes;

CREATE TYPE gen AS ENUM ('f', 'm');

CREATE TABLE IF NOT EXISTS appUsers (
	email VARCHAR( 255 ) UNIQUE PRIMARY KEY,
	uname VARCHAR ( 50 ) NOT NULL,
  age INTEGER NOT NULL,
  gender gen, 
	password VARCHAR ( 50 ) NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP 
);


CREATE TABLE foodComp (
  fID SERIAL PRIMARY KEY,
	email VARCHAR( 255 ),
	fname VARCHAR ( 50 ) NOT NULL,
  cal INTEGER NOT NULL,
  carb INTEGER NOT NULL,
  fat INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  day DATE NOT NULL, 
  CONSTRAINT fk FOREIGN KEY (email)
      REFERENCES appUsers(email) 
);



