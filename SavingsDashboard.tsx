import { useEffect, useMemo, useRef, useState } from "react";

import { useReducedMotion } from "@/lib/use-device";

type Track = "web" | "auto";

const DATA: Record<
  Track,
  {
    label: string;
    caption: string;
    kpis: { key: string; label: string; value: number; suffix: string; progress: number }[];
    chart: number[];
    feed: string[];
  }
> = {
  web: {
    label: "Web + captación automatizada",
    caption: "Simulación del potencial de ahorro con una web que trabaja sola.",
    kpis: [
      { key: "h", label: "Horas recuperadas", value: 34, suffix: " h/mes", progress: 72 },
      { key: "t", label: "Tareas repetitivas eliminadas", value: 118, suffix: "/mes", progress: 64 },
      { key: "c", label: "Ahorro estimado en costes", value: 640, suffix: " €/mes", progress: 58 },
      { key: "a", label: "Atención automatizada", value: 24, suffix: "/7", progress: 100 },
    ],
    chart: [28, 44, 38, 62, 55, 78, 71, 90],
    feed: [
      "Formulario recibido → respuesta automática enviada",
      "Presupuesto generado sin intervención manual",
      "Nuevo contacto sincronizado con el CRM",
      "Landing optimizada: visita convertida en lead",
    ],
  },
  auto: {
    label: "Automatización + NFC",
    caption: "Simulación del potencial de ahorro conectando procesos, IA y NFC/QR.",
    kpis: [
      { key: "h", label: "Horas recuperadas", value: 62, suffix: " h/mes", progress: 88 },
      { key: "t", label: "Tareas repetitivas eliminadas", value: 340, suffix: "/mes", progress: 84 },
      { key: "c", label: "Ahorro estimado en costes", value: 1180, suffix: " €/mes", progress: 76 },
      { key: "a", label: "Atención automatizada", value: 24, suffix: "/7", progress: 100 },
    ],
    chart: [35, 52, 48, 70, 66, 84, 79, 96],
    feed: [
      "Reserva confirmada automáticamente por el sistema",
      "Chatbot resolvió una consulta frecuente",
      "Tarjeta NFC leída → reseña de Google solicitada",
      "Informe semanal enviado por email y WhatsApp",
    ],
  },
};

function useCountUp(value: number, active: boolean, reduced: boolean) {
  const [n, setN] = useState(reduced ? value : 0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (reduced || !active) {
      setN(value);
      return;
    }
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(from + (value - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, active, reduced]);
  return n;
}

function Kpi({
  label,
  value,
  suffix,
  progress,
  active,
  reduced,
}: {
  label: string;
  value: number;
  suffix: string;
  progress: number;
  active: boolean;
  reduced: boolean;
}) {
  const n = useCountUp(value, active, reduced);
  return (
    <div className="kpi">
      <small>{label}</small>
      <b>
        {n.toLocaleString("es-ES")}
        <span style={{ fontSize: 13, letterSpacing: 0 }}>{suffix}</span>
      </b>
      <div className="bar" aria-hidden="true">
        <i style={{ width: `${active ? progress : 0}%` }} />
      </div>
    </div>
  );
}

/**
 * Tarjeta principal del hero: dashboard premium de ahorro operativo.
 * Las cifras son estimaciones visuales, no resultados verificados.
 */
export default function SavingsDashboard({ track }: { track: Track }) {
  const reduced = useReducedMotion();
  const data = DATA[track];
  const [visible, setVisible] = useState(false);
  const [feedIndex, setFeedIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setVisible(true),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setFeedIndex((i) => i + 1), 2600);
    return () => clearInterval(id);
  }, [reduced]);

  const feed = useMemo(() => {
    const items = data.feed;
    return [0, 1].map((k) => items[(feedIndex + k) % items.length]!);
  }, [data.feed, feedIndex]);

  return (
    <div className="savings" ref={ref} aria-live="polite">
      <div className="savings-top">
        <span>pabloleon.studio / panel de ahorro</span>
        <b>
          <span className="dot" style={{ display: "inline-block", marginRight: 6 }} />
          SIMULACIÓN
        </b>
      </div>

      <h3>{data.label}</h3>
      <p>{data.caption}</p>

      <div className="kpi-grid">
        {data.kpis.map((k) => (
          <Kpi
            key={`${track}-${k.key}`}
            label={k.label}
            value={k.value}
            suffix={k.suffix}
            progress={k.progress}
            active={visible}
            reduced={reduced}
          />

        ))}
      </div>

      <div className="savings-chart" aria-hidden="true">
        {data.chart.map((h, i) => (
          <i key={i} style={{ height: `${visible ? h : 4}%`, transitionDelay: `${i * 50}ms` }} />
        ))}
      </div>

      <ul className="savings-feed">
        {feed.map((f) => (
          <li key={f}>
            <span className="dot" />
            <em>·</em> {f}
          </li>
        ))}
      </ul>

      <p className="savings-note">
        Cifras orientativas de potencial de ahorro, generadas como simulación visual para
        ilustrar el impacto de la automatización. No son resultados garantizados ni datos de
        clientes.
      </p>
    </div>
  );
}

