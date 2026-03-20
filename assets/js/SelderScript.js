/*!
=========================================================
* Selder Landing page
=========================================================
* Copyright: 2025 SELDER (https://selder.com.mx)
* Coded by: ABAUTISTA.
=========================================================
*/

// ===========================================
// 1. CONFIGURACIÓN Y VARIABLES GLOBALES
// ===========================================
//const WEBHOOK_URL_N8N = "http://localhost:5678/webhook-test/farmacovigilancia"; // Tu URL de n8n
let currentCaptcha = ''; // Variable para guardar el texto del captcha actual
// Caracteres para generar el captcha
const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz123456789!?¡¿';
// Public Key de EmailJS
emailjs.init("sZ24Yvr5TMEwkmBGk");

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
// 4. FUNCIÓN HELPER PARA ENVIAR A EMAILJS (Reemplaza a n8n)
// ===========================================
/* // Función original de n8n comentada para referencia
function sendDataToN8N(formElement, formType) {
    const formData = new FormData(formElement);
    formData.append('tipo_flujo', formType);
    formData.append('fecha_envio', new Date().toLocaleString());
    const dataToSend = Object.fromEntries(formData.entries());

    return fetch(WEBHOOK_URL_N8N, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: { 'Content-Type': 'application/json' }
    });
}
*/

// Nueva función estable usando EmailJS
function sendWithEmailJS(formElement, serviceID, templateID) {
return emailjs.sendForm(serviceID, templateID, formElement);
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
            const inputsRequeridos = formFarmaco.querySelectorAll('[required]');
            let faltanDatos = false;

            inputsRequeridos.forEach(input => {
                if (!input.value.trim()) {
                    faltanDatos = true;
                    input.style.border = '2px solid #F85C70';
                } else {
                    input.style.border = '1px solid #ced4da';
                }
            });

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
                Swal.fire({ icon: 'warning', title: 'Atención', text: 'Debe responder la pregunta de autorización de datos.', confirmButtonColor: '#FAD02C' });
                return;
            }

            if (authOption.value === "No acepto") {
                Swal.fire({ icon: 'error', title: 'No se puede procesar 🛑', text: 'Su solicitud requiere autorización para almacenar datos.', confirmButtonColor: '#d33' });
                return;
            }

            // C. VALIDACIÓN DE GOOGLE reCAPTCHA (CORREGIDO)
            const response = grecaptcha.getResponse(); // Para Farmaco (ajusta si usas otro widget id)
            if (response.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Seguridad',
                    text: 'Por favor, verifica que no eres un robot.',
                    confirmButtonColor: '#FAD02C'
                });
                return;
            }

            // D. ENVÍO CON EMAILJS
            Swal.fire({ title: 'Enviando...', text: 'Procesando su reporte', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            sendWithEmailJS(formFarmaco, 'service_Farmaco', 'template_farmaco')
                .then(response => {
                    Swal.fire({ icon: 'success', title: '¡Reporte Enviado!', text: 'Gracias por su colaboración.', confirmButtonColor: '#A3C14A' })
                    .then(() => {
                        formFarmaco.reset();
                        grecaptcha.reset(); // Resetear el captcha tras éxito
                        $('.collapse').collapse('hide');
                        $('#collapseOne').collapse('show');
                    });
                })
                .catch(error => {
                    console.error('Error EmailJS:', error);
                    Swal.fire({ icon: 'error', title: 'Error', text: 'Hubo un problema al enviar mediante EmailJS.', confirmButtonColor: '#F85C70' });
                });
        });
    }
});

// ===========================================
// 6. VALIDACIÓN FORMULARIO CONTACTO (General)
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('contactForm');

    if (formContacto) {
        formContacto.addEventListener('submit', function (event) {
            event.preventDefault();

            // 1. Validar Google reCAPTCHA (CORREGIDO)
            const googleResponse = grecaptcha.getResponse();
            if (googleResponse.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Seguridad',
                    text: 'Por favor, verifica el código de seguridad (reCAPTCHA).',
                    confirmButtonColor: '#FAD02C'
                });
                return;
            }

            // 2. Bloquear botón y mostrar carga
            const btn = event.target.querySelector('button[type="submit"]');
            if(btn) btn.disabled = true;

            Swal.fire({ title: 'Enviando mensaje...', text: 'Por favor espera un momento', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

            // 3. Enviar a EmailJS
            emailjs.sendForm('service_Farmaco', 'template_contacto', this)
                .then(function() {
                    Swal.fire({ icon: 'success', title: '¡Mensaje enviado!', text: 'Nos pondremos en contacto contigo pronto.', confirmButtonColor: '#008a76' });
                    formContacto.reset();
                    grecaptcha.reset(); // Resetear captcha
                }, function(error) {
                    console.error('Error detallado:', error);
                    Swal.fire({ icon: 'error', title: 'Error al enviar', text: 'Revisa la configuración de EmailJS.' });
                })
                .finally(() => {
                    if(btn) btn.disabled = false;
                });
        });
    }
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
    // Seleccionamos enlaces que empiezan con #
    // PERO ignoramos los que tienen data-toggle (pestañas/tabs)
    $('a[href^="#"]').not('[data-toggle="pill"], [data-toggle="tab"]').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            const target = $(hash);

            if (target.length) {
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - 1
                }, 800);
            }
        }
    });
});


// // Lógica para el botón "Volver arriba"
// document.addEventListener('DOMContentLoaded', function() {
//     const scrollBtn = document.getElementById("scrollToTopBtn");

//     if (!scrollBtn) return;

//     window.addEventListener('scroll', function() {
//         const distance = window.pageYOffset || document.documentElement.scrollTop;

//         if (distance > 300) {
//             if (scrollBtn.style.display !== "flex") {
//                 scrollBtn.style.display = "flex"; // Usamos flex para centrar el icono
//                 // Forzamos el renderizado antes de la opacidad
//                 void scrollBtn.offsetWidth;
//                 scrollBtn.style.opacity = "1";
//             }
//         } else {
//             scrollBtn.style.opacity = "0";
//             setTimeout(() => {
//                 if (window.pageYOffset <= 300) {
//                     scrollBtn.style.display = "none";
//                 }
//             }, 400);
//         }
//     });

//     scrollBtn.addEventListener("click", function() {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth"
//         });
//     });
// });