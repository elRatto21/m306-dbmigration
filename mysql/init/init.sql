-- Sicherstellen, dass wir in der richtigen Datenbank arbeiten
USE senaycasino;

-- Create tables first
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 2000.0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Games (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    minPlayers INT DEFAULT 1,
    maxPlayers INT DEFAULT 1,
    minBet DECIMAL(10, 2) DEFAULT 0.1,
    maxBet DECIMAL(10, 2) DEFAULT 100.0,
    enabled BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS GameSessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    gameId INT NOT NULL,
    userId INT NOT NULL,
    bet DECIMAL(10, 2) NOT NULL,
    win DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gameId) REFERENCES Games(id),
    FOREIGN KEY (userId) REFERENCES Users(id)
);

-- Insert initial data
INSERT INTO Users (username, password, balance, createdAt, updatedAt) VALUES
('user1', '12345', 2500.0, NOW(), NOW()),
('user2', 'password', 1800.0, NOW(), NOW());

INSERT INTO Games (name, description, minPlayers, maxPlayers, minBet, maxBet, enabled, createdAt, updatedAt) VALUES
('Coinflip', 'A simple 50/50 chance game where players bet on heads or tails.', 1, 16, 1.0, 100000.0, true, NOW(), NOW()),
('Mines', 'Uncover safe spots and avoid the mines to multiply your bet.', 1, 4, 0.1, 10000.0, true, NOW(), NOW()),
('Slots', 'Spin the slot machine reels and try your luck to hit big multipliers.', 1, 1, 0.1, 50.0, true, NOW(), NOW());

INSERT INTO GameSessions (gameId, userId, bet, win, createdAt, updatedAt) VALUES
(1, 1, 100.0, 200.0, NOW(), NOW()),
(1, 2, 50.0, 0.0, NOW(), NOW()),
(2, 1, 25.0, 75.0, NOW(), NOW()),
(2, 2, 10.0, 0.0, NOW(), NOW()),
(3, 1, 5.0, 0.0, NOW(), NOW()),
(3, 2, 10.0, 50.0, NOW(), NOW());

-- Create roles 
CREATE ROLE IF NOT EXISTS 'admin_role', 'read_role', 'write_role';

-- Grant privileges to roles
GRANT ALL PRIVILEGES ON senaycasino.* TO 'admin_role';
GRANT SELECT ON senaycasino.* TO 'read_role';
GRANT INSERT, UPDATE, DELETE ON senaycasino.* TO 'write_role';

-- Create admin user (if not exists)
CREATE USER IF NOT EXISTS 'admin_user'@'%' IDENTIFIED BY 'admin_password';

-- Grant admin role to admin user
GRANT 'admin_role' TO 'admin_user'@'%';

-- Grant read and write roles to the app user that was created by Docker
GRANT 'read_role', 'write_role' TO 'readwrite'@'%';

-- Set default roles for users
SET DEFAULT ROLE 'admin_role' TO 'admin_user'@'%';
SET DEFAULT ROLE 'read_role', 'write_role' TO 'readwrite'@'%';

-- Flush privileges to apply changes
FLUSH PRIVILEGES;