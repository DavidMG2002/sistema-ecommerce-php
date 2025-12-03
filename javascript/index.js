// include.js - Cargar componentes dinámicamente

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

// ...existing code...
document.addEventListener("DOMContentLoaded", () => {
    // Reemplazamos la lógica simple por una función que calcula la base absoluta
    function getBaseUrl() {
        // 1) Intentar deducir la base a partir del <script src="..."> que cargó este archivo
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const s = scripts[i];
            if (!s.src) continue;
            // Buscar archivos comunes que cargan la app
            if (s.src.includes('/javascript/index.js') || s.src.includes('/javascript/include.js')) {
                try {
                    const u = new URL(s.src, window.location.origin);
                    const path = u.pathname;
                    const idx = path.indexOf('/javascript/');
                    if (idx !== -1) {
                        // devuelve por ejemplo "https://localhost/e_commerce/"
                        return u.origin + path.substring(0, idx + 1);
                    }
                } catch (err) {
                    // ignore and continue
                }
            }
        }

        // 2) Si no se encontró, intentar detectar carpeta /e_commerce/ en la ruta actual
        const origin = window.location.origin;
        const path = window.location.pathname;
        const project = '/e_commerce/';
        const idx = path.indexOf(project);
        if (idx !== -1) {
            return origin + path.substring(0, idx + project.length);
        }

        // 3) Si la página está dentro de /html/ (p. ej. /e_commerce/html/...), devolver hasta esa carpeta
        const htmlIdx = path.lastIndexOf('/html/');
        if (htmlIdx !== -1) {
            return origin + path.substring(0, htmlIdx + 1);
        }

        // 4) Fallback a la raíz del host
        return origin + '/';
    }

    const baseUrl = getBaseUrl();

    // Cargar header (si existe el contenedor)
    const headerEl = document.getElementById("header");
    if (headerEl) {
        fetch(`${baseUrl}html/header.html`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(data => {
                headerEl.innerHTML = data;
                // Inicializaciones dependientes del header (si las hubiera)
                // Por ejemplo si header incorpora el menú móvil definido en include.js
                if (typeof initMobileMenu === 'function') {
                    try { initMobileMenu(); } catch (e) { /* no-op */ }
                }
            })
            .catch(error => console.error('Error al cargar header:', error));
    }

    // Cargar footer
    const footerEl = document.getElementById("footer");
    if (footerEl) {
        fetch(`${baseUrl}html/footer.html`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(data => {
                footerEl.innerHTML = data;
            })
            .catch(error => console.error('Error al cargar footer:', error));
    }

    // Cargar barra lateral
    const barraEl = document.getElementById("barra_lateral");
    if (barraEl) {
        fetch(`${baseUrl}html/barra_lateral.html`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(data => {
                barraEl.innerHTML = data;
                if (typeof initColorSelector === 'function') initColorSelector();
            })
            .catch(error => console.error('Error al cargar barra lateral:', error));
    }

    // Cargar waicon
    const waiconEl = document.getElementById("waicon");
    if (waiconEl) {
        fetch(`${baseUrl}html/waicon.html`)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.text();
            })
            .then(data => {
                waiconEl.innerHTML = data;
            })
            .catch(error => console.error('Error al cargar waicon:', error));
    }
});

// ...existing code...