/*!
=========================================================
* Selder Landing page
=========================================================

* Copyright: 2025 SELDER (https://selder.com)
* Coded by: ABAUTISTA.
=========================================================
*/ 

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
}); 


/*///////////*/

jQuery(document).ready(function($) {

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
            $nextButton.on('click', function(e) {
                e.preventDefault();
                showProductSlide(currentIndex + 1);
            });

            // Evento para el botón "Anterior"
            $prevButton.on('click', function(e) {
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
