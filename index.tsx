import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useState } from "react";

import { Contact, Footer, Header, RequestModal } from "@/components/site/Chrome";
import CookieBanner from "@/components/site/CookieBanner";
import CursorTrail from "@/components/site/CursorTrail";
import SavingsDashboard from "@/components/site/SavingsDashboard";
import { automation, plans, reasons, sectors, services, steps } from "@/lib/site-content";
import { useHydrated } from "@/lib/use-device";

const NodeField = lazy(() => import("@/components/site/NodeField"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pablo León Studio — Webs y automatización con IA, NFC y QR" },
      {
        name: "description",
        content:
          "Diseñamos webs y sistemas que automatizan reservas, mensajes, procesos, atención y captación. Automatización con IA, chatbots 24/7 y tarjetas NFC/QR.",
      },
      {
        property: "og:title",
        content: "Pablo León Studio — Webs y automatización con IA, NFC y QR",
      },
      {
        property: "og:description",
        content:
          "Webs, tiendas online y experiencias 3D con automatizaciones, IA y NFC/QR que recuperan horas de trabajo cada mes.",
      },
    ],
  }),
  component: Home,
});

type Track = "web" | "auto";

function TrackPanel({ track, setPlan }: { track: Track; setPlan: (p: string) => void }) {
  const web = track === "web";
  const cards: [string, string][] = web
    ? services.slice(0, 3)
    : [
        [
          "Automatiza reservas",
          "Tu web gestiona citas y reservas sola, sin llamadas ni mensajes perdidos.",
        ],
        [
          "Chatbot siempre disponible",
          "Responde dudas frecuentes y capta clientes potenciales las 24 horas del día.",
        ],
        [
          "Tarjetas NFC y QR",
          "Tarjetas físicas con NFC y QR para reseñas de Google, cartas digitales o contacto instantáneo.",
        ],
      ];

  return (
    <div className="track-panel" key={track}>
      <p className="cap">
        {web
          ? "PÁGINA WEB / EXPERIENCIA DIGITAL"
          : "AUTOMATIZACIÓN + NFC / NEGOCIO CONECTADO"}
      </p>
      <h2>
        {web
          ? "Una web que hace que tu negocio avance."
          : "Tu negocio conectado, incluso cuando tú no estás."}
      </h2>
      <p>
        {web
          ? "Diseñamos páginas web, tiendas online y experiencias 3D. Nada de plantillas genéricas: cada proyecto se diseña desde cero, con identidad visual coherente, responsive y código limpio, rápido y probado."
          : "Reservas, llamadas y tareas repetitivas resueltas por IA. Conectamos herramientas, chatbots y tarjetas NFC/QR para que las tareas repetitivas se resuelvan solas, las 24 horas del día."}
      </p>

      <div className="grid-3">
        {cards.map(([a, b], i) => (
          <article className="track-card" key={a}>
            <span>0{i + 1}</span>
            <h3>{a}</h3>
            <p>{b}</p>
          </article>
        ))}
      </div>

      {web ? (
        <ul className="check-list">
          <li>Reunión inicial sin compromiso</li>
          <li>Diseño 100% personalizado</li>
          <li>Pruebas en todos los dispositivos</li>
          <li>Velocidad de carga y SEO cuidados</li>
        </ul>
      ) : (
        <>
          <div className="chips">
            {automation.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <blockquote className="quote">
            «¿Puedes automatizar la gestión de reservas de mi restaurante?» — Sí, en menos de una
            semana.
          </blockquote>
        </>
      )}

      <button
        className="btn-violet"
        onClick={() => setPlan(web ? "Página Web 3D" : "Automatizaciones")}
      >
        {web ? "Quiero mi página web ↗" : "Quiero automatizar mi negocio ↗"}
      </button>
    </div>
  );
}

function Home() {
  const hydrated = useHydrated();
  const [track, setTrack] = useState<Track>("web");
  const [plan, setPlan] = useState<string | null>(null);
  const [cookieSettings, setCookieSettings] = useState(false);

  const goTrack = (t: Track) => {
    setTrack(t);
    document.querySelector("#recorridos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site" id="inicio">
      <CursorTrail />
      <div className="bg-layer" aria-hidden="true">
        {hydrated && (
          <Suspense fallback={null}>
            <NodeField />
          </Suspense>
        )}
      </div>

      <Header name="01 / DIGITAL SYSTEMS" />

      <section className="hero">
        <div className="hero-copy reveal">
          <p className="cap">WEB · 3D · AUTOMATIZACIÓN · IA · NFC</p>
          <h1>
            Diseñamos webs y sistemas
            <br />
            que <em>automatizan tu negocio.</em>
          </h1>
          <p>
            Pablo León Studio crea páginas web, tiendas online y experiencias 3D que automatizan
            reservas, mensajes, procesos, atención al cliente y captación. Menos tareas repetitivas,
            más horas para lo que importa.
          </p>
          <div className="hero-actions">
            <button className="btn-violet" onClick={() => goTrack("web")}>
              Página web →
            </button>
            <button className="btn-ghost" onClick={() => goTrack("auto")}>
              Automatización + NFC →
            </button>
            <a className="btn-ghost" href="#contacto">
              Empezar mi proyecto ↗
            </a>
          </div>
        </div>

        <SavingsDashboard track={track} />
      </section>

      <div className="marquee" aria-hidden="true">
        <div>
          {[...automation, ...automation].map((a, i) => (
            <span key={i}>{a} ·</span>
          ))}
        </div>
      </div>

      <section id="recorridos" className="section">
        <p className="cap">DOS RECORRIDOS</p>
        <h2>Elige por dónde empieza tu sistema.</h2>
        <div className="track-tabs" role="tablist" aria-label="Recorridos">
          <button
            role="tab"
            aria-selected={track === "web"}
            className={track === "web" ? "chosen" : ""}
            onClick={() => setTrack("web")}
          >
            <b>01</b>
            <span>Página web</span>
            <small>Web, ecommerce y experiencias 3D</small>
          </button>
          <button
            role="tab"
            aria-selected={track === "auto"}
            className={track === "auto" ? "chosen" : ""}
            onClick={() => setTrack("auto")}
          >
            <b>02</b>
            <span>Automatización + NFC</span>
            <small>IA, procesos, QR y tarjetas conectadas</small>
          </button>
        </div>
        <TrackPanel track={track} setPlan={setPlan} />
      </section>

      <section id="servicios" className="section">
        <p className="cap">04 · SERVICIOS</p>
        <h2>Todo lo que necesita tu presencia digital</h2>
        <p>
          Desde una landing page hasta una experiencia 3D completa, pasando por automatizaciones
          que te ahorran horas de trabajo.
        </p>
        <div className="grid-3" style={{ marginTop: 34 }}>
          {services.map(([a, b], i) => (
            <article key={a}>
              <i>✦ {String(i + 1).padStart(2, "0")}</i>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="cap">05 · AUTOMATIZACIONES</p>
        <h2>Automatizamos prácticamente cualquier proceso digital</h2>
        <p>
          Gestionamos y conectamos tus herramientas para que las tareas repetitivas se resuelvan
          solas. Una automatización puede encargarse de tareas repetitivas las 24 horas del día,
          liberando a tu equipo para el trabajo que de verdad aporta valor.
        </p>
        <div className="grid-3" style={{ marginTop: 34 }}>
          {steps.map(([tag, title, text, items], i) => (
            <article key={title}>
              <span>{tag}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul className="check-list" style={{ gridTemplateColumns: "1fr", marginTop: 14 }}>
                {items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <i style={{ opacity: 0.5 }}>0{i + 1}</i>
            </article>
          ))}
        </div>
      </section>

      <section id="planes" className="section">
        <p className="cap">SOLUCIONES A MEDIDA</p>
        <h2>Un estudio. Cinco formas de empezar.</h2>
        <div className="plans-grid">
          {plans.map((p, i) => (
            <article className="plan-card" key={p[0]}>
              <small>0{i + 1} / SOLUCIÓN</small>
              <h3>{p[0]}</h3>
              <b>{p[1] || "A medida"}</b>
              <p>{p[2] || p[3][0]}</p>
              <button className="btn-violet" onClick={() => setPlan(p[0])}>
                {p[4]} →
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="cap">08 · POR QUÉ NOSOTROS</p>
        <h2>Trabajar con un estudio, no con un intermediario</h2>
        <p>Trato directo de principio a fin, sin capas intermedias ni sorpresas de última hora.</p>
        <div className="reasons-grid">
          {reasons.map(([a, b]) => (
            <article className="reason-card" key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section sectors">
        <p className="cap">07 · SECTORES</p>
        <h2 style={{ margin: "10px auto 20px" }}>Negocios con los que encajamos bien</h2>
        <div className="chips">
          {sectors.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      <Contact />
      <Footer onCookieSettings={() => setCookieSettings(true)} />

      <RequestModal plan={plan} close={() => setPlan(null)} />
      <CookieBanner
        openSettings={cookieSettings}
        onSettingsClosed={() => setCookieSettings(false)}
      />

    </div>
  );
}
