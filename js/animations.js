// Create a GSAP timeline
const tl = gsap.timeline();

// Fade in the homepage hero and intro info
tl.from(".hero--homepage", {
    duration: 2,
    scale: 1.5,
    ease: "power3.out",
}).from(".site__intro", {
    duration: 2,
    delay: -2,
    opacity: 0,
    y: "6rem",
    skewX: 10,
    skewY: 10,
});

// Fade in cards when scrolled to
gsap.from(".feature__card", {
    scrollTrigger: {
        trigger: ".feature__card",
        start: "top bottom",
        scrub: 1,
    },
    duration: 0.6,
    opacity: 0,
    y: "9rem",
    stagger: 0.5,
});
