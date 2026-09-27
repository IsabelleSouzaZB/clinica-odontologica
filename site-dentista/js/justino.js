/* =========================================
        DRA. ARIANE JUSTINO
        JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =============================
            ELEMENTOS
    ============================= */

    const header = document.querySelector("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("header nav");
    const navLinks = document.querySelectorAll("header nav a");
    const backTop = document.querySelector("#backToTop");
    const sections = document.querySelectorAll("section[id]");
    const faqItems = document.querySelectorAll(".faq-item");
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.querySelector(".lightbox");
    const closeLightboxBtn = document.querySelector(".close-lightbox");
    const formulario = document.querySelector(".contact-form form");


    /* =============================
            NAVBAR AO ROLAR + MENU ATIVO
            (unificado em um único listener
            de scroll para melhor performance)
    ============================= */

    function atualizarScroll() {

        // Header com fundo ao rolar
        if (header) {
            header.classList.toggle("header-scroll", window.scrollY > 80);
        }

        // Botão voltar ao topo
        if (backTop) {
            backTop.classList.toggle("show", window.scrollY > 500);
        }

        // Link do menu correspondente à seção visível
        if (sections.length && navLinks.length) {

            let currentSection = "";

            sections.forEach((section) => {

                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {
                    currentSection = section.getAttribute("id");
                }

            });

            navLinks.forEach((link) => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${currentSection}`
                );

            });

        }

    }

    // Throttle simples com requestAnimationFrame para não travar o scroll
    let scrollTicking = false;

    window.addEventListener("scroll", () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {
                atualizarScroll();
                scrollTicking = false;
            });

            scrollTicking = true;

        }

    });

    // Define o estado correto já no carregamento da página
    atualizarScroll();


    /* =============================
            MENU HAMBÚRGUER
    ============================= */

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // Fecha o menu ao clicar em qualquer link
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener("click", (event) => {

            const clicouNoMenu = nav.contains(event.target);
            const clicouNoBotao = menuToggle.contains(event.target);

            if (
                nav.classList.contains("active") &&
                !clicouNoMenu &&
                !clicouNoBotao
            ) {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
            }

        });

        // Fecha o menu com a tecla Esc
        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape" && nav.classList.contains("active")) {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
            }

        });

    }


    /* =============================
            BOTÃO VOLTAR AO TOPO
    ============================= */

    if (backTop) {

        backTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

    }


    /* =============================
            ANIMAÇÃO FADE
    ============================= */

    const elementosFade = document.querySelectorAll(".fade");

    if (elementosFade.length) {

        const fadeObserver = new IntersectionObserver((entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {
                    entrada.target.classList.add("show");
                    fadeObserver.unobserve(entrada.target);
                }

            });

        }, { threshold: 0.15 });

        elementosFade.forEach((elemento) => fadeObserver.observe(elemento));

    }


    /* =============================
            FAQ INTERATIVO
    ============================= */

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");

        if (!question) return;

        question.addEventListener("click", () => {

            faqItems.forEach((faq) => {
                if (faq !== item) faq.classList.remove("active");
            });

            item.classList.toggle("active");

        });

    });


    /* =============================
            LIGHTBOX GALERIA
    ============================= */

    if (lightbox && galleryImages.length) {

        const imagemGrande = lightbox.querySelector("img");

        galleryImages.forEach((imagem) => {

            imagem.addEventListener("click", () => {
                imagemGrande.src = imagem.src;
                imagemGrande.alt = imagem.alt;
                lightbox.classList.add("active");
            });

        });

        if (closeLightboxBtn) {
            closeLightboxBtn.addEventListener("click", () => {
                lightbox.classList.remove("active");
            });
        }

        lightbox.addEventListener("click", (event) => {
            if (event.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                lightbox.classList.remove("active");
            }
        });

    }


    /* =============================
        FORMULÁRIO → WHATSAPP
    ============================= */

    if (formulario) {

        formulario.addEventListener("submit", (event) => {

            event.preventDefault();

            const campoTexto = formulario.querySelector('input[type="text"]');
            const campoEmail = formulario.querySelector('input[type="email"]');
            const campoTelefone = formulario.querySelector('input[type="tel"]');
            const campoSelect = formulario.querySelector("select");
            const campoMensagem = formulario.querySelector("textarea");

            const nome = campoTexto ? campoTexto.value.trim() : "";
            const email = campoEmail ? campoEmail.value.trim() : "";
            const telefone = campoTelefone ? campoTelefone.value.trim() : "";
            const procedimento = campoSelect ? campoSelect.value.trim() : "";
            const mensagem = campoMensagem ? campoMensagem.value.trim() : "";

            const texto =
                `Olá, Dra. Ariane! Gostaria de agendar uma consulta.\n\n` +
                `Nome: ${nome}\n` +
                `E-mail: ${email}\n` +
                `Telefone: ${telefone}\n` +
                `Procedimento: ${procedimento}\n\n` +
                `Mensagem:\n${mensagem}`;

            /* COLOQUE O NÚMERO REAL AQUI (formato: DDI + DDD + número) */
            const numeroWhatsApp = "5511999999999";

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank", "noopener");

            formulario.reset();

        });

    }

});