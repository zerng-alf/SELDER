/*!
=========================================================
* Selder Landing page
=========================================================

* Copyright: 2025 SELDER (https://selder.com)
* Coded by: ABAUTISTA.
=========================================================
*/

// smooth scroll
$(document).ready(function () {
    $(".navbar .nav-link").on('click', function (event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });
});


/*///////////*/

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    })
})


/*///////////*/

jQuery(document).ready(function ($) {

    // --- Lógica del Carrusel de Contenedores de Productos ---
    var $productSection = $('#Productos'); // La sección principal

    // Verifica si la sección existe
    if ($productSection.length) {
        var $productSlides = $productSection.children('.product-slide-container'); // Selecciona los contenedores/slides HIJOS DIRECTOS
        var $prevButton = $('#product-carousel-prev'); // Botón Prev (puede estar dentro o fuera de #Productos)
        var $nextButton = $('#product-carousel-next'); // Botón Next (puede estar dentro o fuera de #Productos)
        var slideCount = $productSlides.length;
        var currentIndex = 0; // Índice de la slide activa

        // Función para mostrar una slide específica por índice
        function showProductSlide(index) {
            // Ciclo de índice
            if (index >= slideCount) {
                index = 0;
            } else if (index < 0) {
                index = slideCount - 1;
            }

            // Ocultar la slide actual y mostrar la nueva
            $productSlides.filter('.active').removeClass('active');
            $productSlides.eq(index).addClass('active');

            currentIndex = index; // Actualiza el índice
        }

        // Encontrar y establecer el índice inicial
        currentIndex = $productSlides.filter('.active').index();
        if (currentIndex < 0 || currentIndex >= slideCount) { // Si no se encuentra 'active' o está mal
            currentIndex = 0;
            $productSlides.removeClass('active'); // Limpiar por si acaso
            $productSlides.eq(currentIndex).addClass('active'); // Activar la primera
        }


        // Solo activar botones si hay más de una slide
        if (slideCount > 1) {
            // Evento para el botón "Siguiente"
            $nextButton.on('click', function (e) {
                e.preventDefault();
                showProductSlide(currentIndex + 1);
            });

            // Evento para el botón "Anterior"
            $prevButton.on('click', function (e) {
                e.preventDefault();
                showProductSlide(currentIndex - 1);
            });

        } else {
            // Si solo hay una slide, ocultar los botones
            $prevButton.hide();
            $nextButton.hide();
            // Opcional: Ocultar el contenedor de botones entero
            $prevButton.closest('.container.text-center.my-4').hide();
        }
    } // Fin if ($productSection.length)

}); // Fin de jQuery(document).ready


//*//////////////////VALIDACION  FORM//////////////////////////*/


// Validación de formulario de contacto
// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializa el formulario de contacto
    const contactForm = document.getElementById('contactForm');

    // Agrega un evento de escucha para el envío del formulario
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío normal del formulario
    });
});


// Generador de CAPTCHA ultra seguro
let currentCaptcha;
const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz123456789!?¡¿@$%&';

function generateNewCaptcha() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 100;

    // Generar texto aleatorio
    const captchaText = generateRandomText(6);
    currentCaptcha = captchaText;

    // 1. Fondo con ruido de alta densidad
    ctx.fillStyle = `hsl(${Math.random() * 360}, 30%, 20%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Patrón de interferencia complejo
    drawAdvancedInterference(ctx, canvas);

    // 3. Texto con múltiples distorsiones
    drawDistortedText(ctx, captchaText, canvas);

    // 4. Efecto de sobreposición de ruido
    addNoiseOverlay(ctx, canvas);

    // Mostrar imagen
    const captchaContainer = document.getElementById('captchaImage');
    captchaContainer.innerHTML = '';
    const img = new Image();
    img.src = canvas.toDataURL();
    captchaContainer.appendChild(img);
}

function generateRandomText(length = 6) {
    return Array.from({ length }, () =>
        characters[Math.floor(Math.random() * characters.length)]
    ).join('');
}

function drawAdvancedInterference(ctx, canvas) {
    // Líneas curvas aleatorias
    for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.bezierCurveTo(
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height
        );
        ctx.strokeStyle = `hsla(${Math.random() * 360}, 70%, 50%, 0.2)`;
        ctx.lineWidth = Math.random() * 3;
        ctx.stroke();
    }

    // Puntos de diferentes tamaños
    for (let i = 0; i < 250; i++) {
        ctx.fillStyle = `hsla(${Math.random() * 360}, 50%, 50%, 0.1)`;
        ctx.beginPath();
        ctx.arc(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 4,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    // Formas geométricas aleatorias
    ['triangle', 'circle', 'rect'].forEach(shape => {
        ctx.fillStyle = `hsla(${Math.random() * 360}, 40%, 50%, 0.15)`;
        drawRandomShape(ctx, canvas, shape);
    });
}

function drawDistortedText(ctx, text, canvas) {
    // Configuración dinámica de fuente
    const fontSizes = [32, 34, 36, 38];
    const fontFamilies = ['Arial', 'Verdana', 'Georgia', 'Courier'];

    // Efecto de onda sinusoidal
    const wave = {
        amplitude: 4,
        frequency: 0.05
    };

    text.split('').forEach((char, i) => {
        ctx.save();

        // Posición dinámica
        const x = 25 + i * 40 + Math.random() * 5;
        const y = 60 + Math.sin(Date.now() * 0.002 + i) * wave.amplitude;

        // Rotación y escala aleatoria
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.6);
        ctx.scale(1 + Math.random() * 0.2, 1 + Math.random() * 0.2);

        // Estilos variables
        ctx.font = `${fontSizes[Math.floor(Math.random() * fontSizes.length)]}px 
                   ${fontFamilies[Math.floor(Math.random() * fontFamilies.length)]}`;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;

        // Sombra dinámica
        ctx.shadowColor = `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = Math.random() * 5 - 2.5;
        ctx.shadowOffsetY = Math.random() * 5 - 2.5;

        ctx.fillText(char, 0, 0);
        ctx.restore();
    });
}

function addNoiseOverlay(ctx, canvas) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Añadir ruido granular
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.7) {
            const noise = Math.random() * 50;
            data[i] += noise;     // Rojo
            data[i + 1] += noise;   // Verde
            data[i + 2] += noise;   // Azul
        }
    }

    // Añadir efecto de desenfoque estratégico
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.95) {
            data[i] = data[i + 4];
            data[i + 1] = data[i + 5];
            data[i + 2] = data[i + 6];
        }
    }

    ctx.putImageData(imageData, 0, 0);
}

function drawRandomShape(ctx, canvas, type) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 30 + 10;

    switch (type) {
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size, y);
            ctx.lineTo(x + size / 2, y + size);
            ctx.closePath();
            ctx.fill();
            break;

        case 'circle':
            ctx.beginPath();
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 'rect':
            ctx.fillRect(x, y, size, size);
            break;
    }
}
// Generar CAPTCHA al cargar y redimensionar ventana
window.addEventListener('load', generateNewCaptcha);
window.addEventListener('resize', generateNewCaptcha);

// Inicializar CAPTCHA
generateNewCaptcha();

// Validación de formulario
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener valores
    const campos = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim(),
        captcha: document.getElementById('captchaAnswer').value.trim().toUpperCase()
    };

    // Validar campos vacíos
    for (const campo in campos) {
        if (campos[campo] === '') {
            Swal.fire({
                icon: 'error',
                title: 'Campo vacío',
                text: `Por favor complete el campo: ${campo === 'captcha' ? 'CAPTCHA' : campo}`,
                confirmButtonColor: '#3085d6'
            });
            return;
        }
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(campos.email)) {
        Swal.fire({
            icon: 'error',
            title: 'Email inválido',
            text: 'Por favor ingrese un correo electrónico válido',
            confirmButtonColor: '#3085d6'
        });
        return;
    }

    // Validar CAPTCHA
    if (campos.captcha !== currentCaptcha) {
        Swal.fire({
            icon: 'error',
            title: 'CAPTCHA incorrecto',
            text: 'El texto ingresado no coincide con la imagen',
            confirmButtonColor: '#3085d6'
        });
        document.getElementById('captchaAnswer').value = '';
        generateNewCaptcha();
        return;
    }

    // Si todo es válido
    Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Gracias por contactarnos, te responderemos pronto.',
        confirmButtonColor: '#3085d6'
    }).then(() => {
        this.reset();
        generateNewCaptcha();
    });
});



document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});