import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function CursorTrail() {
  const trail = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !trail.current) return undefined;
    const dots = Array.from(trail.current.children) as HTMLElement[];
    const points = dots.map(() => ({ x: -100, y: -100 }));
    let target = { x: -100, y: -100 };
    let frame = 0;
    const move = (event: PointerEvent) => { target = { x: event.clientX, y: event.clientY }; };
    const tick = () => {
      points.forEach((point, index) => {
        const leader = index === 0 ? target : points[index - 1]!;
        point.x += (leader.x - point.x) * (index === 0 ? 0.35 : 0.23);
        point.y += (leader.y - point.y) * (index === 0 ? 0.35 : 0.23);
        dots[index]!.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${1 - index * 0.1})`;
        dots[index]!.style.opacity = target.x < 0 ? "0" : `${1 - index * 0.12}`;
      });
      frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div className="cursor-trail" ref={trail} aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => <i key={i} />)}
    </div>,
    document.body,
  );
}
