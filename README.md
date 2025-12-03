# 🛍️ E-commerce con Sistema de Autenticación

Sistema web de comercio electrónico con funcionalidad completa de registro e inicio de sesión de usuarios, desarrollado con PHP, MySQL y JavaScript.

![Estado del Proyecto](https://img.shields.io/badge/Estado-Activo-success)
![Versión](https://img.shields.io/badge/Versión-1.0.0-blue)
![Licencia](https://img.shields.io/badge/Licencia-MIT-green)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Seguridad](#-seguridad)
- [API Endpoints](#-api-endpoints)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Problemas Comunes](#-problemas-comunes)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## ✨ Características

- ✅ **Sistema de autenticación completo** (registro, login, logout)
- 🔐 **Contraseñas hasheadas** con bcrypt
- 🎫 **Sesiones persistentes** en PHP
- 📱 **Diseño responsive** con Tailwind CSS
- 🎨 **Interfaz moderna** y amigable
- 🔒 **Prevención de SQL Injection** con PDO
- ⚡ **Carga dinámica** de componentes
- 👤 **Visualización del usuario** logueado
- 🌐 **Menú responsive** con hamburger menu
- 💬 **Botón de WhatsApp** flotante

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **Tailwind CSS 3.x** - Framework de estilos
- **JavaScript ES6+** - Lógica del cliente
- **Fetch API** - Peticiones asíncronas
- **Font Awesome 6.5** - Iconografía
- **Swiper.js 11.x** - Carrusel de imágenes

### Backend
- **PHP 8.2** - Lenguaje del servidor
- **MySQL 8.0** - Base de datos
- **PDO** - Acceso seguro a base de datos
- **Apache 2.4** - Servidor web

### Herramientas de Desarrollo
- **XAMPP** - Entorno de desarrollo local
- **VS Code** - Editor de código
- **Git** - Control de versiones

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **XAMPP** (v8.2 o superior) - [Descargar aquí](https://www.apachefriends.org/)
- **Git** (opcional) - [Descargar aquí](https://git-scm.com/)
- **Navegador web moderno** (Chrome, Firefox, Edge, Safari)

---

## 🚀 Instalación

### Paso 1: Descargar o Clonar el Repositorio

#### Opción A: Clonar con Git
```bash
cd C:\xampp\htdocs\
git clone https://github.com/tu-usuario/e_commerce.git
```

#### Opción B: Descargar ZIP
1. Descargar el proyecto como ZIP
2. Extraer en `C:\xampp\htdocs\`
3. Renombrar la carpeta a `e_commerce`

### Paso 2: Iniciar XAMPP

1. Abrir el **Panel de Control de XAMPP**
2. Iniciar **Apache** (debe aparecer en verde)
3. Iniciar **MySQL** (debe aparecer en verde)

---

## ⚙️ Configuración

### 1. Crear la Base de Datos

1. Abrir el navegador y visitar: `http://localhost/phpmyadmin`
2. Click en **"Nueva"** en el panel izquierdo
3. Nombre de la base de datos: `ecommerce_db`
4. Cotejamiento: `utf8mb4_general_ci`
5. Click en **"Crear"**

### 2. Crear la Tabla de Usuarios

Ejecutar el siguiente SQL en la pestaña **SQL**:

```sql
CREATE TABLE usuarios (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 3. Configurar la Conexión (si es necesario)

Editar el archivo `php/config.php` con tus credenciales:

```php
<?php
$host = 'localhost';
$dbname = 'ecommerce_db';
$username = 'root';
$password = ''; // Tu contraseña de MySQL (por defecto está vacía en XAMPP)
```

---

## 🎯 Uso

### Acceder al Sistema

1. **Abrir el navegador**
2. **Visitar:** `http://localhost/e_commerce/index.html`

### Registro de Usuario

1. Click en **"Iniciar Sesión"** (esquina superior derecha)
2. Click en la pestaña **"Registrarse"**
3. Llenar el formulario:
   - **Nombre:** Tu nombre completo
   - **Email:** correo@ejemplo.com
   - **Contraseña:** Mínimo 6 caracteres
4. Click en **"Registrarse"**
5. Mensaje de confirmación: ✅ "Registro exitoso"

### Iniciar Sesión

1. En la página de login, pestaña **"Iniciar Sesión"**
2. Ingresar:
   - **Email:** Tu email registrado
   - **Contraseña:** Tu contraseña
3. Click en **"Iniciar Sesión"**
4. Redirección automática a la página principal
5. Tu nombre aparecerá en la esquina superior derecha

### Cerrar Sesión

1. Click en el botón **"Salir"** (junto a tu nombre)
2. La sesión se cerrará automáticamente
3. Volverás al estado de "No autenticado"

---

## 📁 Estructura del Proyecto

```
e_commerce/
│
├── index.html                  # Página principal
├── login.html                  # Sistema de login/registro
├── README.md                   # Este archivo
│
├── html/                       # Componentes HTML reutilizables
│   ├── header.html             # Encabezado con menú
│   ├── footer.html             # Pie de página
│   ├── waicon.html             # Botón de WhatsApp
│   └── barra_lateral.html      # Barra lateral (opcional)
│
├── javascript/                 # Scripts del cliente
│   ├── include.js              # Carga dinámica de componentes
│   └── index.js                # Funcionalidad página principal
│
├── php/                        # Backend PHP
│   ├── config.php              # Configuración de base de datos
│   ├── auth.php                # Sistema de autenticación
│   ├── check_session.php       # Verificación de sesión
│   └── logout.php              # Cerrar sesión
│
├── css/                        # Estilos personalizados
│   └── style.css               # CSS adicional
│
├── src/                        # Assets del proyecto
│   └── imagenes/               # Imágenes del sitio
│       ├── hero_test/          # Imágenes del carrusel
│       └── jpg/                # Imágenes de productos
│
└── .htaccess                   # Configuración de Apache (opcional)
```

---

## 🗄️ Base de Datos

### Estructura de la Tabla `usuarios`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | INT(11) | Identificador único (AUTO_INCREMENT) |
| `nombre` | VARCHAR(100) | Nombre completo del usuario |
| `email` | VARCHAR(100) | Correo electrónico (UNIQUE) |
| `password` | VARCHAR(255) | Contraseña hasheada con bcrypt |
| `fecha_registro` | TIMESTAMP | Fecha de registro automática |

### Ejemplo de Registro

```sql
INSERT INTO usuarios (nombre, email, password) 
VALUES ('Juan Pérez', 'juan@example.com', '$2y$10$abc123...');
```

**Nota:** La contraseña nunca se almacena en texto plano, siempre hasheada con `password_hash()`.

---

## 🔒 Seguridad

### Medidas Implementadas

#### 1. Contraseñas Seguras
```php
// Hashing al registrar
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Verificación al hacer login
password_verify($password, $usuario['password'])
```

#### 2. Prevención de SQL Injection
```php
// Uso de Prepared Statements
$stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
```

#### 3. Validaciones
- ✅ Formato de email válido
- ✅ Longitud mínima de contraseña (6 caracteres)
- ✅ Email único (no duplicados)
- ✅ Sanitización de entradas

#### 4. Sesiones Seguras
```php
session_start();
$_SESSION['user_id'] = $usuario['id'];
```

### Recomendaciones Adicionales

Para un entorno de producción:
- 🔐 Usar HTTPS
- 🔑 Variables de entorno para credenciales
- 🕐 Expiración de sesiones
- 🚫 Rate limiting en login
- 📧 Verificación de email
- 🔄 Tokens CSRF

---

## 🌐 API Endpoints

### POST `/php/auth.php`

Sistema de autenticación principal.

#### Registro
```javascript
fetch('php/auth.php', {
    method: 'POST',
    body: new URLSearchParams({
        action: 'register',
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        password: '123456'
    })
})
```

**Respuesta exitosa:**
```json
{
    "success": true,
    "message": "Usuario registrado exitosamente"
}
```

#### Login
```javascript
fetch('php/auth.php', {
    method: 'POST',
    body: new URLSearchParams({
        action: 'login',
        email: 'juan@example.com',
        password: '123456'
    })
})
```

**Respuesta exitosa:**
```json
{
    "success": true,
    "message": "Login exitoso",
    "user": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
    }
}
```

#### Logout
```javascript
fetch('php/auth.php', {
    method: 'POST',
    body: new URLSearchParams({
        action: 'logout'
    })
})
```

### GET `/php/check_session.php`

Verificar sesión activa.

**Respuesta (con sesión):**
```json
{
    "loggedIn": true,
    "user": {
        "id": 1,
        "nombre": "Juan Pérez",
        "email": "juan@example.com"
    }
}
```

**Respuesta (sin sesión):**
```json
{
    "loggedIn": false
}
```

---

## 📸 Capturas de Pantalla

### Página Principal
![Index](docs/screenshots/index.png)

### Sistema de Login
![Login](docs/screenshots/login.png)

### Usuario Logueado
![Usuario](docs/screenshots/usuario.png)

### Vista Mobile
![Mobile](docs/screenshots/mobile.png)

---

## ❓ Problemas Comunes

### Error 404 - Archivos no encontrados

**Problema:** Los componentes (header, footer) no cargan.

**Solución:**
```javascript
// Verificar rutas en include.js
// Deben ser rutas absolutas
fetch('/e_commerce/html/header.html')
```

### Error de conexión a base de datos

**Problema:** "Error de conexión: SQLSTATE[HY000] [1045] Access denied"

**Solución:**
1. Verificar que MySQL esté corriendo en XAMPP
2. Comprobar credenciales en `php/config.php`
3. Por defecto, XAMPP usa `root` sin contraseña

### Sesión no persiste

**Problema:** El nombre del usuario no aparece después del login.

**Solución:**
1. Limpiar caché del navegador (Ctrl + Shift + R)
2. Verificar que `php/check_session.php` exista
3. Comprobar que `session_start()` esté en los archivos PHP

### Estilos no se aplican

**Problema:** El sitio se ve sin estilos.

**Solución:**
1. Verificar que Tailwind CDN esté cargando
2. Limpiar caché: Ctrl + F5
3. Verificar consola del navegador (F12)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

### Guía de Estilo

- 📝 Código limpio y comentado
- ✅ Seguir convenciones de nombres
- 🧪 Probar cambios antes de commitear
- 📖 Actualizar documentación si es necesario

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

```
MIT License

Copyright (c) 2025 [Tu Nombre]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tuemail@ejemplo.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

---

## 🙏 Agradecimientos

- [Tailwind CSS](https://tailwindcss.com/) - Framework de estilos
- [Font Awesome](https://fontawesome.com/) - Iconos
- [Swiper](https://swiperjs.com/) - Carrusel
- [PHP](https://www.php.net/) - Lenguaje del servidor
- [MySQL](https://www.mysql.com/) - Base de datos

---

## 📚 Recursos Adicionales

- [Documentación de PHP](https://www.php.net/manual/es/)
- [Documentación de MySQL](https://dev.mysql.com/doc/)
- [Guía de Tailwind CSS](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [PHP The Right Way](https://phptherightway.com/)

---

## 🔄 Historial de Versiones

### v1.0.0 (2025-01-15)
- ✅ Sistema de autenticación completo
- ✅ Diseño responsive
- ✅ Carga dinámica de componentes
- ✅ Seguridad básica implementada

---

## 🚀 Roadmap / Mejoras Futuras

- [ ] Carrito de compras
- [ ] Panel de administración
- [ ] Recuperación de contraseña
- [ ] OAuth (Google, Facebook)
- [ ] Sistema de roles
- [ ] Paginación de productos
- [ ] Filtros avanzados
- [ ] Wishlist
- [ ] Historial de compras

---

**⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub**

---

Desarrollado con ❤️ y ☕

© 2025 E-commerce Project. Todos los derechos reservados.