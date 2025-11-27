/*!
=========================================================
* Selder Landing page
=========================================================

* Copyright: 2025 SELDER (https://selder.com)
* Coded by: ABAUTISTA.
=========================================================
*/

// ===========================================
// CONFIGURACIÓN DE ENVÍO A N8N
// ===========================================

// *** ¡IMPORTANTE! PEGA AQUÍ LA URL ÚNICA DE TU NODO WEBHOOK DE N8N ***
const WEBHOOK_URL_N8N = "http://localhost:5678/webhook-test/farmacovigilancia";

// Variables globales para la navegación
let currentStep = 1; // Inicializa en el primer paso
const totalSteps = 4; // Total de pasos definidos en el HTML

// ===========================================
// LÓGICA DE NAVEGACIÓN Y CARRUSEL (EXISTENTE)
// ===========================================

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
    var $productSection = $('#Productos');

    // Verifica si la sección existe
    if ($productSection.length) {
        var $productSlides = $productSection.children('.product-slide-container');
        var $prevButton = $('#product-carousel-prev');
        var $nextButton = $('#product-carousel-next');
        var slideCount = $productSlides.length;
        var currentIndex = 0;

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
        if (currentIndex < 0 || currentIndex >= slideCount) {
            currentIndex = 0;
            $productSlides.removeClass('active');
            $productSlides.eq(currentIndex).addClass('active');
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
    }

}); // Fin de jQuery(document).ready


/*//////////////////////////////////////////////////////////
// VALIDACIÓN DE FORMULARIOS Y LÓGICA DE CAPTCHA
//////////////////////////////////////////////////////////*/

// Generador de CAPTCHA
let currentCaptcha;
const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjiklmnopqrstuvwxyz123456789!?¡¿@$%&';

// --- Funciones auxiliares del CAPTCHA ---

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

        ctx.font = `${fontSizes[Math.floor(Math.random() * fontSizes.length)]}px
                     ${fontFamilies[Math.floor(Math.random() * fontFamilies.length)]}`;
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
            data[i] += noise;
            data[i + 1] += noise;
            data[i + 2] += noise;
        }
    }

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

// Función principal de generación y visualización de CAPTCHA
function generateNewCaptcha() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 280;
    canvas.height = 100;

    const captchaText = generateRandomText(6);
    currentCaptcha = captchaText; 

    // Dibujo del CAPTCHA
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
        captchaContainer.appendChild(img);
    }
}

// Generar CAPTCHA al cargar y redimensionar ventana
window.addEventListener('load', generateNewCaptcha);
window.addEventListener('resize', generateNewCaptcha);
generateNewCaptcha();


// ===========================================
// FUNCIÓN DE ENVÍO CENTRAL A N8N (FETCH API)
// ===========================================

function sendDataToN8N(formElement, formType) {
    // 1. Recoger datos (usa los atributos 'name' del HTML)
    const formData = new FormData(formElement);
    
    // 2. Añadir el campo de identificación CLAVE para n8n
    formData.append('tipo_flujo', formType); 
    
    // 3. Convertir FormData a un objeto JSON
    const dataToSend = Object.fromEntries(formData.entries());

    // 4. Enviar usando Fetch API
    return fetch(WEBHOOK_URL_N8N, {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
}


// ===========================================
// VALIDACIÓN FORMULARIO 1: FARMACOVIGILANCIA (Quejas)
// ID: farmacoForm
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    const formQuejas = document.getElementById('farmacoForm');
    if (!formQuejas) return;

    formQuejas.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores de los campos para validación
        const campos = {
            'Nombre de la persona a contactar': document.getElementById('nombre_contacto').value.trim(),
            'Correo electrónico': document.getElementById('correo').value.trim(),
            'Descripción de la queja': document.getElementById('descripcion_queja').value.trim(),
            'CAPTCHA': document.getElementById('captchaAnswer').value.trim()
        };

        // 1. Validar campos vacíos
        for (const campo in campos) {
            if (campos[campo] === '') {
                Swal.fire({ icon: 'error', title: 'Campo vacío', text: `Por favor complete el campo: ${campo}`, confirmButtonColor: '#3085d6' });
                return;
            }
        }

        // 2. Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(campos['Correo electrónico'])) {
            Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Por favor ingrese un correo electrónico válido', confirmButtonColor: '#3085d6' });
            return;
        }

        // 3. Validar CAPTCHA
        if (campos['CAPTCHA'].toLowerCase() !== currentCaptcha.toLowerCase()) {
            Swal.fire({ icon: 'error', title: 'CAPTCHA incorrecto', text: 'El texto ingresado no coincide con la imagen.', confirmButtonColor: '#3085d6' });
            document.getElementById('captchaAnswer').value = '';
            generateNewCaptcha(); // Regenera el captcha
            return;
        }

        // 4. Envío de datos a n8n
        sendDataToN8N(this, 'Farmacovigilancia')
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Queja Enviada!',
                        text: 'Su reporte ha sido enviado a procesamiento.',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        this.reset();
                        generateNewCaptcha();
                    });
                } else {
                     throw new Error('Error al enviar a n8n');
                }
            })
            .catch(error => {
                console.error('Error de envío:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Servidor',
                    text: 'Hubo un problema al contactar al servidor n8n. Por favor, revise la consola.',
                    confirmButtonColor: '#3085d6'
                });
            });
    });
});


// ===========================================
// VALIDACIÓN FORMULARIO 2: CONTACTO
// ID: contactForm
// ===========================================
document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('contactForm1');
    if (!formContacto) return;

    formContacto.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener valores de los campos para validación
        const campos = {
            'Nombre': document.getElementById('name').value.trim(),
            'Correo electrónico': document.getElementById('email').value.trim(),
            'Mensaje': document.getElementById('message').value.trim(),
            'CAPTCHA': document.getElementById('captchaAnswer').value.trim()
        };

        // 1. Validar campos vacíos
        for (const campo in campos) {
            if (campos[campo] === '') {
                Swal.fire({ icon: 'error', title: 'Campo vacío', text: `Por favor complete el campo: ${campo}`, confirmButtonColor: '#3085d6' });
                return;
            }
        }

        // 2. Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(campos['Correo electrónico'])) {
            Swal.fire({ icon: 'error', title: 'Email inválido', text: 'Por favor ingrese un correo electrónico válido', confirmButtonColor: '#3085d6' });
            return;
        }

        // 3. Validar CAPTCHA
        if (campos['CAPTCHA'].toLowerCase() !== currentCaptcha.toLowerCase()) {
            Swal.fire({ icon: 'error', title: 'CAPTCHA incorrecto', text: 'El texto ingresado no coincide con la imagen.', confirmButtonColor: '#3085d6' });
            document.getElementById('captchaAnswer').value = '';
            generateNewCaptcha(); // Regenera el captcha
            return;
        }

        // 4. Envío de datos a n8n
        sendDataToN8N(this, 'CONTACTO')
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Mensaje Enviado!',
                        text: 'Su mensaje ha sido enviado a procesamiento.',
                        confirmButtonColor: '#3085d6'
                    }).then(() => {
                        this.reset();
                        generateNewCaptcha();
                    });
                } else {
                     throw new Error('Error al enviar a n8n');
                }
            })
            .catch(error => {
                console.error('Error de envío:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de Servidor',
                    text: 'Hubo un problema al contactar al servidor n8n. Por favor, revise la consola.',
                    confirmButtonColor: '#3085d6'
                });
            });
    });
});


document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownMenu = this.nextElementSibling;
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
});

// ===========================================
// LÓGICA DE NAVEGACIÓN Y VALIDACIÓN POR PASOS
// ===========================================

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('farmacoForm');
    if (!form) return;

    // Referencias a los botones y elementos
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const steps = form.querySelectorAll('.form-step');
    const progressSteps = form.querySelectorAll('.progress-step');

    // Muestra el paso actual, oculta los demás y actualiza los botones/progreso
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
        });
        // Agregamos .form-step para que busque SOLO en los pasos del formulario, no en la barra
        const currentActiveStep = form.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (currentActiveStep) {
            currentActiveStep.classList.add('active');
        }

        // Actualizar barra de progreso
        progressSteps.forEach(pStep => {
            pStep.classList.remove('active');
            if (parseInt(pStep.getAttribute('data-step')) <= stepNumber) {
                pStep.classList.add('active');
            }
        });

        // Control de visibilidad de botones
        prevBtn.style.display = stepNumber > 1 ? 'inline-block' : 'none';
        nextBtn.style.display = stepNumber < totalSteps ? 'inline-block' : 'none';
        submitBtn.style.display = stepNumber === totalSteps ? 'inline-block' : 'none';

        // Generar CAPTCHA solo al llegar al último paso
        if (stepNumber === totalSteps) {
            generateNewCaptcha();
        }
    }

// --- FUNCIÓN DE VALIDACIÓN ROBUSTA ---
    function validateCurrentStep() {
        const currentActiveStep = form.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (!currentActiveStep) return true;

        // Seleccionamos TODOS los inputs, selects y textareas requeridos
        const inputs = currentActiveStep.querySelectorAll('[required]');
        let isValid = true;
        let firstErrorInput = null;

        // Iteramos sobre cada campo
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            
            // Limpiar errores previos
            input.classList.remove('is-invalid');
            input.style.border = '1px solid #ced4da'; // Regresar al borde gris

            // A. VALIDACIÓN PARA RADIO BUTTONS (Sexo)
            if (input.type === 'radio') {
                const groupName = input.name;
                // Buscar si alguno del grupo está marcado
                const isChecked = currentActiveStep.querySelector(`input[name="${groupName}"]:checked`);
                
                if (!isChecked) {
                    isValid = false;
                    // Alerta visual para radios
                    Swal.fire({
                        icon: 'warning',
                        title: 'Faltan datos',
                        text: 'Por favor seleccione una opción (ej. Sexo).',
                        confirmButtonColor: '#FAD02C',
                        confirmButtonText: '<span style="color:#000">Entendido</span>'
                    });
                    if (!firstErrorInput) firstErrorInput = input;
                    return false; // Detener el ciclo y retornar error
                }
            } 
            
            // B. VALIDACIÓN PARA TEXTO, FECHAS, TEXTAREAS
            else {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid'); // Clase de error de bootstrap
                    input.style.border = '2px solid #F85C70'; // Borde rojo manual
                    
                    Swal.fire({
                        icon: 'warning',
                        title: 'Campo vacío',
                        text: `Por favor complete: ${input.placeholder || 'este campo'}`,
                        confirmButtonColor: '#FAD02C',
                        confirmButtonText: '<span style="color:#000">OK</span>'
                    });
                    
                    if (!firstErrorInput) firstErrorInput = input;
                    isValid = false;
                    return false; // Detener al primer error para no spamear alertas
                }
            }

            // C. VALIDACIÓN DE EMAIL (Solo si escribieron algo)
            if (input.type === 'email' && input.value.trim() !== '') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    input.style.border = '2px solid #F85C70';
                    Swal.fire({
                        icon: 'error',
                        title: 'Email inválido',
                        text: 'Verifique el formato del correo.',
                        confirmButtonColor: '#FAD02C'
                    });
                    isValid = false;
                    return false;
                }
            }
        }
        
        return isValid;
    }

    // Listeners de Botones
    if (nextBtn) {
        nextBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevenir cualquier comportamiento raro
            if (validateCurrentStep()) {
                currentStep++;
                showStep(currentStep);
                window.scrollTo(0, document.getElementById('contact-quejas').offsetTop - 100);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function (e) {
            e.preventDefault();
            currentStep--;
            showStep(currentStep);
        });
    }

    // Listener de Envío Final
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validar CAPTCHA
        const captchaInput = document.getElementById('captchaAnswer');
        if (captchaInput.value.toLowerCase().trim() !== currentCaptcha.toLowerCase()) {
            Swal.fire({ icon: 'error', title: 'Error', text: 'El código de seguridad es incorrecto.' });
            captchaInput.value = '';
            generateNewCaptcha();
            return;
        }

        // Mostrar cargando
        Swal.fire({
            title: 'Enviando...',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });

        // Enviar a n8n
        sendDataToN8N(this, 'Farmacovigilancia')
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Enviado!',
                        text: 'Gracias por su reporte.',
                        confirmButtonColor: '#FAD02C'
                    }).then(() => {
                        this.reset();
                        currentStep = 1;
                        showStep(1);
                    });
                } else {
                    throw new Error('Falló n8n');
                }
            })
            .catch(() => {
                Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar el reporte. Intente más tarde.' });
            });
    });

    // Iniciar
    showStep(currentStep);
});