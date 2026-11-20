
// ===================================
// DAXVEL INTERACTIVE PORTFOLIO
// ===================================

// 1. THEME SWITCHER

const themeButton = document.querySelector(".theme-toggle");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeButton.textContent = isDark ? "☀" : "☾";
    themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );
});


// 2. MOBILE NAVIGATION

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});


// 3. ANIMATED PROFESSION TITLE

const changingText = document.getElementById("changing-text");

const roles = [
    "Aspiring Developer",
    "Technology Enthusiast",
    "Creative Problem Solver",
    "Future Full-Stack Developer"
];

let roleIndex = 0;

setInterval(() => {
    changingText.style.opacity = 0;

    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;

        changingText.textContent = roles[roleIndex];
        changingText.style.opacity = 1;
    }, 300);

}, 2500);


// 4. SCROLL REVEAL

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(section => {
    observer.observe(section);
});


// 5. CUSTOM CURSOR AND POINTER GLOW

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const pointerGlow = document.querySelector(".pointer-glow");

const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (hasFinePointer && !prefersReducedMotion) {

    document.addEventListener("mousemove", (event) => {
        const { clientX, clientY } = event;

        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;

        cursorOutline.style.left = `${clientX}px`;
        cursorOutline.style.top = `${clientY}px`;

        pointerGlow.style.left = `${clientX}px`;
        pointerGlow.style.top = `${clientY}px`;
    });

    document.querySelectorAll("a, button").forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursorOutline.style.width = "55px";
            cursorOutline.style.height = "55px";
        });

        element.addEventListener("mouseleave", () => {
            cursorOutline.style.width = "35px";
            cursorOutline.style.height = "35px";
        });

    });
}


// 6. ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {

            navigationLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });

        }

    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach(section => navObserver.observe(section));


// 7. AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();


console.log("DAXVEL interactive portfolio initialized.");
