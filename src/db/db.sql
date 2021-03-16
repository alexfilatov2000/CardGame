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
    status INT DEFAULT 0,
    code VARCHAR(30) DEFAULT '0',
    UNIQUE (login)
);


CREATE TABLE IF NOT EXISTS cardInfo (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    price INT(3) NOT NULL,
    health INT(3) NOT NULL,
    attack INT(2) NOT NULL
);

INSERT INTO
    cardInfo(name, price, health, attack)
VALUES
    ('Iron-Man', 3, 2, 3),
    ('Captain America', 4, 6, 3),
    ('Hulk', 5, 6, 4),
    ('Thor', 5, 6, 4),
    ('Black Widow', 2, 1, 2),
    ('Black Panther', 4, 2, 4),
    ('Okoye', 2, 1, 2),
    ('Ant-Man', 2, 2, 1),
    ('Wasp', 2, 2, 1),
    ('Doctor Strange', 3, 1, 3),
    ('Hawkeye', 2, 1, 2),
    ('Falcon', 2, 2, 2),
    ('Maria Hill', 1, 1, 1),
    ('Vision', 2, 2, 1),
    ('War Machine', 3, 3, 2),
    ('Nick Fury', 3, 3, 2),
    ('Ultron', 2, 2, 1),
    ('Loki', 2, 3, 1),
    ('Red Skull', 1, 1, 1),
    ('Star-Lord', 2, 1, 2);

