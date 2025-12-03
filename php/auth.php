<?php
/**
 * auth.php
 * Sistema de autenticación: registro, login, logout y verificación de sesión
 */

require_once 'config.php';
header('Content-Type: application/json');

// Obtener la acción solicitada
$action = $_POST['action'] ?? '';

// =====================================
// REGISTRO DE USUARIOS
// =====================================
if ($action === 'register') {
    
    // Obtener y limpiar datos
    $nombre = trim($_POST['nombre'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validar campos obligatorios
    if (empty($nombre) || empty($email) || empty($password)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Todos los campos son obligatorios'
        ]);
        exit;
    }

    // Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Email no válido'
        ]);
        exit;
    }

    // Validar longitud de contraseña
    if (strlen($password) < 6) {
        echo json_encode([
            'success' => false, 
            'message' => 'La contraseña debe tener al menos 6 caracteres'
        ]);
        exit;
    }

    try {
        // Verificar si el email ya está registrado
        $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->fetch()) {
            echo json_encode([
                'success' => false, 
                'message' => 'Este email ya está registrado'
            ]);
            exit;
        }

        // Hashear la contraseña de forma segura
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Insertar nuevo usuario en la base de datos
        $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$nombre, $email, $passwordHash]);

        echo json_encode([
            'success' => true, 
            'message' => 'Usuario registrado exitosamente'
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error al registrar usuario'
        ]);
    }
}

// =====================================
// LOGIN DE USUARIOS
// =====================================
elseif ($action === 'login') {
    
    // Obtener y limpiar datos
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Validar campos obligatorios
    if (empty($email) || empty($password)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Email y contraseña son obligatorios'
        ]);
        exit;
    }

    try {
        // Buscar usuario por email
        $stmt = $pdo->prepare("SELECT id, nombre, email, password FROM usuarios WHERE email = ?");
        $stmt->execute([$email]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verificar si existe el usuario y la contraseña es correcta
        if ($usuario && password_verify($password, $usuario['password'])) {
            
            // Iniciar sesión
            session_start();
            $_SESSION['user_id'] = $usuario['id'];
            $_SESSION['user_nombre'] = $usuario['nombre'];
            $_SESSION['user_email'] = $usuario['email'];

            echo json_encode([
                'success' => true, 
                'message' => 'Login exitoso',
                'user' => [
                    'id' => $usuario['id'],
                    'nombre' => $usuario['nombre'],
                    'email' => $usuario['email']
                ]
            ]);
            
        } else {
            echo json_encode([
                'success' => false, 
                'message' => 'Email o contraseña incorrectos'
            ]);
        }

    } catch (PDOException $e) {
        echo json_encode([
            'success' => false, 
            'message' => 'Error al iniciar sesión'
        ]);
    }
}

// =====================================
// CERRAR SESIÓN (LOGOUT)
// =====================================
elseif ($action === 'logout') {
    
    session_start();
    session_destroy();
    
    echo json_encode([
        'success' => true, 
        'message' => 'Sesión cerrada'
    ]);
}

// =====================================
// VERIFICAR SESIÓN ACTUAL
// =====================================
elseif ($action === 'check_session') {
    
    session_start();
    
    if (isset($_SESSION['user_id'])) {
        echo json_encode([
            'success' => true,
            'logged_in' => true,
            'user' => [
                'id' => $_SESSION['user_id'],
                'nombre' => $_SESSION['user_nombre'],
                'email' => $_SESSION['user_email']
            ]
        ]);
    } else {
        echo json_encode([
            'success' => true, 
            'logged_in' => false
        ]);
    }
}

// =====================================
// ACCIÓN NO VÁLIDA
// =====================================
else {
    echo json_encode([
        'success' => false, 
        'message' => 'Acción no válida'
    ]);
}
?>