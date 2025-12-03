<?php
/**
 * Archivo de configuración de ejemplo
 * Copia este archivo como config.php y ajusta los valores
 */

$host = 'localhost';
$dbname = 'ecommerce_db';
$username = 'root';
$password = ''; // Tu contraseña de MySQL

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4", 
        $username, 
        $password
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
?>