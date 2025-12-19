import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGsap = (fn, deps = []) => {
  useEffect(() => {
    const ctx = gsap.context(fn);
    return () => ctx.revert();
  }, deps);
};
