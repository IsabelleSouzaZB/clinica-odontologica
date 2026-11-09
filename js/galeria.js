// ===== GALERIA: "VER MAIS RESULTADOS" =====
document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("galeriaMais");
    const extras = document.querySelectorAll(".gallery-item.is-extra");
    const secao = document.getElementById("galeria");

    if (!botao || !extras.length) return;

    let aberto = false;

    botao.addEventListener("click", () => {

        aberto = !aberto;

        extras.forEach((item) => {
            item.hidden = !aberto;
        });

        botao.textContent = aberto ? "Ver menos" : "Ver mais resultados";
        botao.setAttribute("aria-expanded", String(aberto));

        // ao recolher, volta ao início da galeria para não ficar perdido na página
        if (!aberto && secao) {
            secao.scrollIntoView({ behavior: "smooth" });
        }

    });

});