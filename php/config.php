<?php
/**
 * config.php
 * Configuración de conexión a la base de datos
 */

// Configuración de la base de datos
$host = 'localhost';
$dbname = 'ecommerce_db';
$username = 'root';
$password = ''; // Sin contraseña (XAMPP por defecto)

try {
    // Crear conexión PDO
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4", 
        $username, 
        $password
    );
    
    // Configurar modo de error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Configurar modo de fetch
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
} catch(PDOException $e) {
    // En caso de error, mostrar mensaje
    die("Error de conexión: " . $e->getMessage());
}
?>