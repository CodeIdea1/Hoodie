// animations/fadeIn.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeIn = (
  element: HTMLElement | null,
  delay: number = 0,
  duration: number = 1
) => {
  if (!element) return;

  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: duration,  // ✅ تمرير القيمة بشكل صحيح
      delay: delay,        // ✅ تمرير القيمة بشكل صحيح
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    }
  );
};
