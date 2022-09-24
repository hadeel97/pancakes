CREATE DATABASE pancakes;

CREATE TYPE gen AS ENUM ('f', 'm');

--set extension
CREATE TABLE IF NOT EXISTS appUsers (
  id SERIAL PRIMARY KEY,
	uname VARCHAR ( 255 ) UNIQUE NOT NULL,
  email VARCHAR( 255 ) UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  gender gen, 
	password VARCHAR ( 255 ) NOT NULL
);


CREATE TABLE foodComp (
  ID SERIAL PRIMARY KEY,
	user_id INTEGER,
	fname VARCHAR ( 50 ) NOT NULL,
  meal VARCHAR (50) NOT NULL,
  cal FLOAT NOT NULL,
  carb FLOAT NOT NULL,
  fat FLOAT NOT NULL,
  protein FLOAT NOT NULL,
  serving FLOAT NOT NULL,
  day DATE NOT NULL, 
  CONSTRAINT fk FOREIGN KEY (user_id)
      REFERENCES appUsers(ID) 
);


--insert fake users 

INSERT INTO appUsers(uname, email,age,gender,password) VALUES
 ('hadilemah', 'hadilemah@icloud.com', 24 , 'f' , 'Hadile1997');
INSERT INTO appUsers(uname, email,age,gender,password) VALUES
 ('mounir', 'mounirmah@icloud.com', 24 , 'm' , 'mounir1889');

