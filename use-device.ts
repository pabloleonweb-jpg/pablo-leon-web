import { useEffect, useState } from "react";

/** Respeta prefers-reduced-motion del sistema. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Solo true tras la hidratación: evita desajustes de SSR. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export type PerfTier = "low" | "mid" | "high";

/** Estima la capacidad gráfica para reducir complejidad en móvil / equipos lentos. */
export function usePerfTier(): PerfTier {
  const [tier, setTier] = useState<PerfTier>("mid");
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 4;
    const mem = nav.deviceMemory ?? 4;
    const narrow = window.matchMedia("(max-width: 820px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (cores <= 4 || mem <= 4 || (narrow && coarse)) setTier("low");
    else if (cores >= 8 && !narrow) setTier("high");
    else setTier("mid");
  }, []);
  return tier;
}

