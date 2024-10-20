CREATE DATABASE IF NOT EXISTS fstck-db;

-- Создаем пользователя
CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';

-- Даем пользователю все привилегии на базу данных
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
