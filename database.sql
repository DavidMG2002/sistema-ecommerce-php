-- EJECUTAR EN MYSQL O PHPMYADMIN

-- 1. Crear base de datos
CREATE DATABASE IF NOT EXISTS ecommerce_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Seleccionar la base de datos
USE ecommerce_db;

-- 3. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Crear índice en email para búsquedas rápidas
CREATE INDEX idx_email ON usuarios(email);

-- Verificar que se creó correctamente
SHOW TABLES;
DESCRIBE usuarios;