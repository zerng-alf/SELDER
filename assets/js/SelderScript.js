/*!
=========================================================
* Selder Landing page
=========================================================
* Copyright: 2025 SELDER (https://selder.com)
* Coded by: ABAUTISTA.
=========================================================
*/

// ===========================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES
// ===========================================
const WEBHOOK_URL_N8N = "http://localhost:5678/webhook-test/farmacovigilancia"; // Tu URL de n8n
let currentCaptcha = ''; // Variable para guardar el texto del captcha actual
const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz123456789!?¡¿';

// ===========================================
// 2. LÓGICA DE NAVEGACIÓN Y CARRUSEL
// ===========================================

// Smooth scroll
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

// Portfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    if (t.length) {
        t.isotope({
            filter: ".new",
            animationOptions: { duration: 750, easing: "linear", queue: !1 }
        });
        $(".filters a").click(function() {
            $(".filters .active").removeClass("active"), $(this).addClass("active");
            var i = $(this).attr("data-filter");
            return t.isotope({
                filter: i,
                animationOptions: { duration: 750, easing: "linear", queue: !1 }
            }), !1
        });
    }
});

// Carrusel de Productos
jQuery(document).ready(function ($) {
    var $productSection = $('#Productos');
    if ($productSection.length) {
        var $productSlides = $productSection.children('.product-slide-container');
        var $prevButton = $('#product-carousel-prev');
        var $nextButton = $('#product-carousel-next');
        var slideCount = $productSlides.length;
        var currentIndex = 0;

        function showProductSlide(index) {
            if (index >= slideCount) index = 0;
            else if (index < 0) index = slideCount - 1;
            $productSlides.filter('.active').removeClass('active');
            $productSlides.eq(index).addClass('active');
            currentIndex = index;
        }

        currentIndex = $productSlides.filter('.active').index();
        if (currentIndex < 0 || currentIndex >= slideCount) {
            currentIndex = 0;
            $productSlides.removeClass('active');
            $productSlides.eq(currentIndex).addClass('active');
        }

        if (slideCount > 1) {
            $nextButton.on('click', function (e) { e.preventDefault(); showProductSlide(currentIndex + 1); });
            $prevButton.on('click', function (e) { e.preventDefault(); showProductSlide(currentIndex - 1); });
        } else {
            $prevButton.hide(); $nextButton.hide();
            $prevButton.closest('.container.text-center.my-4').hide();
        }
    }
});

// ===========================================
// 3. LÓGICA DEL CAPTCHA
// ===========================================

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
    // Puntos
    for (let i = 0; i < 250; i++) {
        ctx.fillStyle = `hsla(${Math.random() * 360}, 50%, 50%, 0.1)`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
    }
    // Formas geométricas
    ['triangle', 'circle', 'rect'].forEach(shape => {
        ctx.fillStyle = `hsla(${Math.random() * 360}, 40%, 50%, 0.15)`;
        drawRandomShape(ctx, canvas, shape);
    });
}

function drawDistortedText(ctx, text, canvas) {
    const fontSizes = [32, 34, 36, 38];
    const fontFamilies = ['Arial', 'Verdana', 'Georgia', 'Courier'];
    const wave = { amplitude: 4, frequency: 0.05 };

    text.split('').forEach((char, i) => {
        ctx.save();
        const x = 25 + i * 40 + Math.random() * 5;
        const y = 60 + Math.sin(Date.now() * 0.002 + i) * wave.amplitude;

        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.6);
        ctx.scale(1 + Math.random() * 0.2, 1 + Math.random() * 0.2);

        ctx.font = `${fontSizes[Math.floor(Math.random() * fontSizes.length)]}px ${fontFamilies[Math.floor(Math.random() * fontFamilies.length)]}`;
        ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
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
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() > 0.7) {
            const noise = Math.random() * 50;
            data[i] += noise; data[i + 1] += noise; data[i + 2] += noise;
        }
    }
    ctx.putImageData(imageData, 0, 0);
}

function drawRandomShape(ctx, canvas, type) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 30 + 10;
    ctx.beginPath();
    if (type === 'triangle') {
        ctx.moveTo(x, y); ctx.lineTo(x + size, y); ctx.lineTo(x + size / 2, y + size);
    } else if (type === 'circle') {
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    } else if (type === 'rect') {
        ctx.fillRect(x, y, size, size);
    }
    ctx.fill();
}

function generateNewCaptcha() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 100;

    const captchaText = generateRandomText(6);
    currentCaptcha = captchaText;

    // Fondo oscuro para resaltar tus colores neón
    ctx.fillStyle = `hsl(${Math.random() * 360}, 30%, 20%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawAdvancedInterference(ctx, canvas);
    drawDistortedText(ctx, captchaText, canvas);
    addNoiseOverlay(ctx, canvas);

    const captchaContainer = document.getElementById('captchaImage');
    if (captchaContainer) {
        captchaContainer.innerHTML = '';
        const img = new Image();
        img.src = canvas.toDataURL();
        // Ajuste de estilo para que quepa en el formulario nuevo
        img.style.width = '100%';
        img.style.borderRadius = '5px';
        captchaContainer.appendChild(img);
    }

    // Limpiar input
    const input = document.getElementById('captchaAnswer');
    if(input) input.value = '';
}

// Eventos de carga del Captcha
window.addEventListener('load', generateNewCaptcha);
window.addEventListener('resize', generateNewCaptcha);


// ===========================================
// 4. FUNCIÓN HELPER PARA ENVIAR A N8N
// ===========================================
function sendDataToN8N(formElement, formType) {
    const formData = new FormData(formElement);
    formData.append('tipo_flujo', formType); // Identificador para n8n
    // Agregar fecha automática
    formData.append('fecha_envio', new Date().toLocaleString());

    const dataToSend = Object.fromEntries(formData.entries());

    return fetch(WEBHOOK_URL_N8N, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: { 'Content-Type': 'application/json' }
    });
}

// ===========================================
// 5. VALIDACIÓN DEL FORMULARIO DE FARMACOVIGILANCIA
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    const formFarmaco = document.getElementById('farmacoForm');

    if (formFarmaco) {
        formFarmaco.addEventListener('submit', function (e) {
            e.preventDefault();

            // A. VALIDACIÓN DE CAMPOS REQUERIDOS
            // Esto buscará cualquier input con 'required' que esté vacío
            const inputsRequeridos = formFarmaco.querySelectorAll('[required]');
            let faltanDatos = false;

            inputsRequeridos.forEach(input => {
                if (!input.value.trim()) {
                    faltanDatos = true;
                    input.style.border = '2px solid #F85C70'; // Resaltar error
                } else {
                    input.style.border = '1px solid #ced4da'; // Resetear
                }
            });

            // Validar radio de "¿Es médico?"
            const esMedico = formFarmaco.querySelector('input[name="es_medico"]:checked');
            if (!esMedico) faltanDatos = true;

            if (faltanDatos) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Faltan datos',
                    text: 'Por favor complete todos los campos marcados como obligatorios.',
                    confirmButtonColor: '#FAD02C'
                });
                return;
            }

            // B. VALIDACIÓN DE AUTORIZACIÓN DE DATOS
            const authOption = document.querySelector('input[name="autorizacion_datos"]:checked');

            if (!authOption) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atención',
                    text: 'Debe responder la pregunta de autorización de datos.',
                    confirmButtonColor: '#FAD02C'
                });
                return;
            }

            // *** Autorización para almacenar datos ***
            if (authOption.value === "No acepto") {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede procesar 🛑',
                    text: 'Su solicitud no podrá procesar la Sospecha de Reacción Adversa a Medicamentos (SRAM) sin su autorización para almacenar datos.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Entendido'
                });
                return; // 🛑 Detiene el proceso
            }

            // C. VALIDACIÓN DE CAPTCHA
            const captchaInput = document.getElementById('captchaAnswer');
            if (captchaInput.value.trim().toLowerCase() !== currentCaptcha.toLowerCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Seguridad',
                    text: 'El código del captcha es incorrecto.',
                    confirmButtonColor: '#FAD02C'
                });
                captchaInput.value = '';
                generateNewCaptcha(); // Recargar captcha
                return;
            }

            // D. ENVÍO A N8N
            Swal.fire({
                title: 'Enviando...',
                text: 'Procesando su reporte',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            sendDataToN8N(formFarmaco, 'Farmacovigilancia')
                .then(response => {
                    if (response.ok) {
                        Swal.fire({
                            icon: 'success',
                            title: '¡Reporte Enviado!',
                            text: 'Gracias por su colaboración.',
                            confirmButtonColor: '#A3C14A'
                        }).then(() => {
                            formFarmaco.reset();
                            generateNewCaptcha();
                            // Colapsar acordeones para que se vea limpio
                            $('.collapse').collapse('hide');
                            $('#collapseOne').collapse('show');
                        });
                    } else {
                        throw new Error('Error en el servidor');
                    }
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al enviar. Intente más tarde.',
                        confirmButtonColor: '#F85C70'
                    });
                });
        });
    }
});


// ===========================================
// 6. VALIDACIÓN FORMULARIO CONTACTO
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('contactForm1');
    if (!formContacto) return;

    formContacto.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validaciones básicas de contacto...
        const nombre = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const captcha = document.getElementById('captchaAnswer').value.trim();

        if(!nombre || !email) {
             Swal.fire({ icon: 'warning', title: 'Campos vacíos', text: 'Complete los datos de contacto.', confirmButtonColor: '#FAD02C' });
             return;
        }

        if (captcha.toLowerCase() !== currentCaptcha.toLowerCase()) {
            Swal.fire({ icon: 'error', title: 'Captcha incorrecto', confirmButtonColor: '#FAD02C' });
            return;
        }

        sendDataToN8N(formContacto, 'CONTACTO_GENERAL')
            .then(res => {
                if(res.ok) {
                    Swal.fire({ icon: 'success', title: 'Mensaje Enviado', confirmButtonColor: '#A3C14A' });
                    this.reset();
                    generateNewCaptcha();
                } else {
                    throw new Error();
                }
            })
            .catch(() => Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar el mensaje.' }));
    });
});

// Dropdown Toggle (Para menús)
document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        if(dropdownMenu) {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// =========================================================
// LÓGICA DEL FORMULARIO DE FARMACOVIGILANCIA
// =========================================================

document.addEventListener('DOMContentLoaded', function () {
    const formFarmaco = document.getElementById('farmacoForm');

    // Solo ejecutar si el formulario existe en la página
    if (formFarmaco) {

        formFarmaco.addEventListener('submit', function (e) {
            // 1. Detener el envío automático inmediatamente
            e.preventDefault();

            // ------------------------------------------------
            // A. VALIDACIÓN DE CAMPOS VACÍOS
            // ------------------------------------------------
            // Busca todos los inputs que tengan el atributo 'required'
            const inputsRequeridos = formFarmaco.querySelectorAll('[required]');
            let hayErrores = false;
            let primerCampoError = null;

            // Limpiar estilos de error previos
            inputsRequeridos.forEach(input => input.style.border = '1px solid #ced4da');

            // Verificar uno por uno
            for (let input of inputsRequeridos) {
                if (!input.value.trim()) {
                    hayErrores = true;
                    input.style.border = '2px solid #F85C70'; // Resaltar en rojo
                    if (!primerCampoError) primerCampoError = input; // Guardar el primero para el foco
                }
            }

            // Validar radio buttons (como "¿Es médico?" o "Sexo")
            // Buscamos los grupos de radio buttons requeridos
            const radioGroups = ['es_medico', 'sexo', 'autorizacion_datos'];
            for (let name of radioGroups) {
                const radios = formFarmaco.querySelectorAll(`input[name="${name}"]`);
                if (radios.length > 0) {
                    const seleccionado = formFarmaco.querySelector(`input[name="${name}"]:checked`);
                    if (!seleccionado) {
                        hayErrores = true;

                    }
                }
            }

            // Si falta algún dato obligatorio, mostramos alerta y detenemos
            if (hayErrores) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Faltan datos',
                    text: 'Por favor complete todos los campos obligatorios marcados (*).',
                    confirmButtonColor: '#FAD02C'
                });
                if (primerCampoError) primerCampoError.focus();
                return; // 🛑 DETIENE EL PROCESO AQUÍ
            }

            // ------------------------------------------------
            // B. VALIDACIÓN DE "NO ACEPTO AUTORIZACIÓN DE DATOS
            // ------------------------------------------------
            const authOption = document.querySelector('input[name="autorizacion_datos"]:checked');

            // Esta validación doble asegura que no sea nulo (aunque ya validamos arriba)
            if (authOption && authOption.value === "No acepto") {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede procesar 🛑',
                    text: 'Su solicitud no podrá procesar la Sospecha de Reacción Adversa a Medicamentos (SRAM) sin su autorización para almacenar datos.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Entendido'
                });
                return; // 🛑 DETIENE EL PROCESO AQUÍ
            }

            // ------------------------------------------------
            // C. VALIDACIÓN DE CAPTCHA
            // ------------------------------------------------
            const captchaInput = document.getElementById('captchaAnswer');
            // Aseguramos que currentCaptcha exista y comparamos
            if (typeof currentCaptcha !== 'undefined' && captchaInput.value.trim().toLowerCase() !== currentCaptcha.toLowerCase()) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Seguridad',
                    text: 'El código del captcha es incorrecto.',
                    confirmButtonColor: '#FAD02C'
                });
                captchaInput.value = '';
                if (typeof generateNewCaptcha === 'function') {
                    generateNewCaptcha(); // Recargar captcha si la función existe
                }
                return; // 🛑 DETIENE EL PROCESO AQUÍ
            }

            // ------------------------------------------------
            // D. ENVÍO DE DATOS A N8N (Éxito)
            // ------------------------------------------------
            Swal.fire({
                title: 'Enviando...',
                text: 'Procesando su reporte',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            // Preparar datos
            const formData = new FormData(formFarmaco);
            const data = Object.fromEntries(formData.entries());
            data.fecha_envio = new Date().toLocaleString();
            data.tipo_flujo = 'Farmacovigilancia'; // Identificador

            // Enviar
            fetch(WEBHOOK_URL_N8N, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Reporte Enviado!',
                        text: 'Gracias por su colaboración.',
                        confirmButtonColor: '#A3C14A'
                    }).then(() => {
                        formFarmaco.reset();
                        if (typeof generateNewCaptcha === 'function') generateNewCaptcha();
                        // Cerrar acordeones si usas Bootstrap
                        $('.collapse').collapse('hide');
                        $('#collapseOne').collapse('show');
                    });
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .catch(error => {
                console.error('Error al enviar:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar el reporte. Intente más tarde.',
                    confirmButtonColor: '#F85C70'
                });
            });
        });
    }
});


/*----scroll */

// Función para scroll suave a la sección
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 1, // Ajusta el offset si tienes navbar fijo
            behavior: 'smooth'
        });
    }
}

$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 1
            }, 800);
        }
    });
});
