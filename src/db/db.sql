CREATE DATABASE users;

USE users;

CREATE USER 'ofilatovUsers'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON users.* TO 'ofilatovUsers'@'localhost';

CREATE TABLE IF NOT EXISTS userInfo (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    login VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    UNIQUE (login)
);