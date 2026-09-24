document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const header =
        document.getElementById("header");

    const backTop =
        document.getElementById("backTop");

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");

    const navLinks =
        document.querySelectorAll(
            ".navigation a"
        );

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    /* =====================================================
       HEADER AL HACER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    function updateBackTop() {

        if (!backTop) return;

        if (window.scrollY > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );

        }

    }


    function handleScroll() {

        updateHeader();

        updateBackTop();

        /*
           Fallback del efecto reveal.
           Comprueba manualmente qué elementos
           están dentro del viewport.
        */

        revealOnScroll();

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       REVEAL AL HACER SCROLL
    ===================================================== */

    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;

        revealElements.forEach(
            element => {

                const rect =
                    element.getBoundingClientRect();

                /*
                   El elemento se muestra cuando
                   entra aproximadamente al 85%
                   de la pantalla.
                */

                if (
                    rect.top <
                    windowHeight * 0.88
                ) {

                    element.classList.add(
                        "visible"
                    );

                }

            }
        );

    }


    /*
       Observer adicional.
       Esto permite que la animación sea
       más precisa.
    */

    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "visible"
                                    );

                            }

                        }
                    );

                },
                {
                    threshold: 0.08,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            element => {

                observer.observe(
                    element
                );

            }
        );

    }


    /*
       Ejecutamos inmediatamente.
    */

    revealOnScroll();


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    if (
        menuButton &&
        navigation
    ) {

        menuButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const opened =
                    navigation.classList.toggle(
                        "open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(opened)
                );

            }
        );


        /*
           Cerrar al pulsar un enlace.
        */

        navLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation.classList.remove(
                            "open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );


        /*
           Cerrar al pulsar fuera.
        */

        document.addEventListener(
            "click",
            event => {

                if (
                    navigation.classList.contains(
                        "open"
                    ) &&
                    !navigation.contains(
                        event.target
                    ) &&
                    !menuButton.contains(
                        event.target
                    )
                ) {

                    navigation.classList.remove(
                        "open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /*
           Si vuelve a escritorio,
           cerrar menú.
        */

        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 768
                ) {

                    navigation.classList.remove(
                        "open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       BOTÓN VOLVER ARRIBA
    ===================================================== */

    if (backTop) {

        backTop.addEventListener(
            "click",
            event => {

                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       SCROLL SUAVE PARA TODOS LOS ENLACES INTERNOS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !targetId ||
                            targetId === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const targetPosition =
                            target.getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerHeight;


                        window.scrollTo({

                            top:
                                targetPosition,

                            behavior:
                                "smooth"

                        });

                    }
                );

            }
        );


    /* =====================================================
       SCROLLSPY
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (
        sections.length &&
        "IntersectionObserver"
        in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                link => {

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    link.classList.toggle(
                                        "active",
                                        href ===
                                        `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0,

                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       INICIALIZACIÓN
    ===================================================== */

    updateHeader();

    updateBackTop();

    revealOnScroll();

});