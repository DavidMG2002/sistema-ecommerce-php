// include.js - Cargar componentes dinámicamente

// Función para inicializar selector de color (compatible con el código existente)
function initColorSelector() {
    const colorButtons = document.querySelectorAll(".color-btn");

    colorButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Quitar selección anterior
            colorButtons.forEach(b => {
                b.classList.remove("border-4");
                const check = b.querySelector("i");
                if (check) check.classList.add("hidden");
            });

            // Marcar el color seleccionado
            btn.classList.add("border-4");
            const checkIcon = btn.querySelector("i");
            if (checkIcon) checkIcon.classList.remove("hidden");

            console.log("Color seleccionado:", btn.dataset.color);
        });
    });
}

// Función para obtener la ruta base correcta
function getBasePath() {
    // Siempre usar ruta absoluta para e_commerce
    return '/e_commerce/html/';
}

// Función para cargar componentes
function loadComponent(elementId, fileName) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.log(`Elemento ${elementId} no encontrado en esta página`);
        return;
    }

    const basePath = getBasePath();
    const filePath = basePath + fileName;
    
    console.log(`Cargando ${elementId} desde: ${filePath}`);

    fetch(filePath)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP ${res.status} - ${filePath}`);
            }
            return res.text();
        })
        .then(data => {
            element.innerHTML = data;
            
            console.log(`✓ ${elementId} cargado correctamente`);
            
            // Si es el header, inicializar menú móvil
            if (elementId === 'header') {
                setTimeout(initMobileMenu, 200);
            }
            
            // Si es barra lateral, inicializar selector de color
            if (elementId === 'barra_lateral') {
                setTimeout(initColorSelector, 200);
            }
        })
        .catch(error => {
            console.error(`✗ Error cargando ${elementId}:`, error.message);
        });
}

// Función para inicializar menú móvil (SOLO se ejecuta después de cargar header)
function initMobileMenu() {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const iconOpen = document.getElementById("icon-open");
    const iconClose = document.getElementById("icon-close");

    if (!menuBtn || !mobileMenu) {
        console.log('⚠ Elementos del menú móvil no encontrados (normal si no hay header en esta página)');
        return;
    }

    console.log('✓ Menú móvil inicializado');

    // Remover listeners antiguos si existen
    const newMenuBtn = menuBtn.cloneNode(true);
    menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

    newMenuBtn.addEventListener("click", () => {
        const isOpen = mobileMenu.classList.contains("opacity-100");
        if (isOpen) {
            mobileMenu.classList.remove("opacity-100", "translate-y-0", "scale-y-100");
            mobileMenu.classList.add("opacity-0", "-translate-y-10", "scale-y-0");
            if (iconOpen) iconOpen.classList.remove("hidden");
            if (iconClose) iconClose.classList.add("hidden");
        } else {
            mobileMenu.classList.remove("opacity-0", "-translate-y-10", "scale-y-0");
            mobileMenu.classList.add("opacity-100", "translate-y-0", "scale-y-100");
            if (iconOpen) iconOpen.classList.add("hidden");
            if (iconClose) iconClose.classList.remove("hidden");
        }
    });
}

// Cargar componentes cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    console.log('=== Iniciando carga de componentes ===');
    console.log('Ruta actual:', window.location.pathname);
    console.log('Base path:', getBasePath());
    
    // Cargar componentes
    loadComponent('header', 'header.html');
    loadComponent('footer', 'footer.html');
    loadComponent('barra_lateral', 'barra_lateral.html');
    loadComponent('waicon', 'waicon.html');
});