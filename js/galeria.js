// ===== CARROSSEL AUTOMÁTICO DA GALERIA =====
document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".gallery-track");
    const slider = document.querySelector(".gallery-slider");

    if (!track || !slider) return;

    let index = 0;

    function getVisibleCount() {
        const largura = window.innerWidth;
        if (largura <= 576) return 1;
        if (largura <= 900) return 2;
        return 3;
    }

    function totalItens() {
        return track.children.length;
    }

    function moverSlide() {
        const visiveis = getVisibleCount();
        const totalPaginas = Math.ceil(totalItens() / visiveis);

        index++;
        if (index >= totalPaginas) index = 0;

        const larguraItem = track.children[0].getBoundingClientRect().width;
        const gap = 25;
        const deslocamento = index * visiveis * (larguraItem + gap);

        track.style.transform = `translateX(-${deslocamento}px)`;
    }

    let autoplay = setInterval(moverSlide, 4000); // troca a cada 4 segundos

    // pausa quando o mouse passa por cima da galeria
    slider.addEventListener("mouseenter", () => clearInterval(autoplay));
    slider.addEventListener("mouseleave", () => {
        autoplay = setInterval(moverSlide, 4000);
    });

    // recalcula posição ao redimensionar a tela
    window.addEventListener("resize", () => {
        index = 0;
        track.style.transform = `translateX(0)`;
    });

});