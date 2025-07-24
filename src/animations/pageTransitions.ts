import gsap from "gsap";

export const pageTransitionIn = () => {
  return gsap.fromTo(
    "main",
    { opacity: 0, y: 100 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
  );
};

export const pageTransitionOut = () => {
  return gsap.to("main", {
    opacity: 0,
    y: -100,
    duration: 0.5,
    ease: "power2.inOut",
  });
};