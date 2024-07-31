document.addEventListener("DOMContentLoaded", () => {
    gsap.set(".rating", { filter: "contrast(100%)" });

    gsap.to(".rating", {
        duration: 0.6,
        filter: "contrast(200%)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
});