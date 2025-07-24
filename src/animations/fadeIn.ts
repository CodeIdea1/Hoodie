// animations/fadeIn.ts
import gsap from "gsap";

// تعريف نوع ScrollTrigger
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let ScrollTrigger: ScrollTriggerType | null = null;

// تحقق من أننا في بيئة المتصفح قبل تسجيل ScrollTrigger
if (typeof window !== "undefined") {
  import("gsap/ScrollTrigger").then((module) => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }).catch((error) => {
    console.warn("Failed to load ScrollTrigger:", error);
  });
}

export const fadeIn = (
  element: HTMLElement | null,
  delay: number = 0,
  duration: number = 1
): void => {
  if (!element || typeof window === "undefined" || !ScrollTrigger) {
    return;
  }

  try {
    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
          onRefresh: () => {
            if (!element.isConnected) {
              return false;
            }
          }
        },
      }
    );
  } catch (error) {
    console.warn("fadeIn animation failed:", error);
    // fallback للتأكد من ظهور العنصر حتى لو فشل الانيميشن
    if (element) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  }
};