import { useState, type ReactNode } from "react";

import { email, instagramHandle, instagramUrl } from "@/lib/site-content";

const whatsappUrl = "https://wa.me/34697790219?text=Hola%20Pablo%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto.";
const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&format=svg&data=${encodeURIComponent(whatsappUrl)}`;

export function Header({ name }: { name: string }) {
  return (
    <header className="top">
      <a href="/" className="mark">
        PABLO LEÓN <i>STUDIO</i>
      </a>
      <span>{name}</span>
      <nav>
        <a href="/#servicios">Servicios</a>
        <a href="/#planes">Precios</a>
        <a href="/#contacto">Contacto</a>
      </nav>
    </header>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        alert("Gracias por contactar. Responderemos lo antes posible.");
      }}
    >
      <input placeholder="Nombre" aria-label="Nombre" required />
      <input type="email" placeholder="Email" aria-label="Email" required />
      <textarea rows={4} placeholder="Mensaje" aria-label="Mensaje" required />
      <button type="submit" className="btn-violet">
        {sent ? "Mensaje enviado ✓" : "Enviar mensaje ↗"}
      </button>
    </form>
  );
}

export function RequestModal({ plan, close }: { plan: string | null; close: () => void }) {
  if (!plan) return null;
  return (
    <div className="shade" role="dialog" aria-modal="true" onMouseDown={close}>
      <div className="dialog" onMouseDown={(e) => e.stopPropagation()}>
        <button className="dialog-close" onClick={close} aria-label="Cerrar">
          ×
        </button>
        <p className="cap">SOLICITAR: {plan}</p>
        <h2>Cuéntanos tu idea y te respondemos lo antes posible.</h2>
        <ContactForm />
        <a className="link" href={`mailto:${email}`} style={{ display: "block", marginTop: 16 }}>
          {email}
        </a>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="section contact">
      <p className="cap">CONTACTO, AYUDA Y SOPORTE</p>
      <h2>Hablemos de tu proyecto</h2>
      <p style={{ margin: "0 auto" }}>
        Cuéntanos qué necesitas y te respondemos lo antes posible.
      </p>
      <div style={{ marginTop: 18 }}>
        <a className="link" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="link" href={instagramUrl} target="_blank" rel="noreferrer">
          {instagramHandle}
        </a>
      </div>
      <a className="whatsapp-qr" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Contactar por WhatsApp">
        <span>
          <small>CONTACTO DIRECTO</small>
          <strong>Escanea y abre WhatsApp</strong>
          <em>+34 697 790 219</em>
        </span>
        <img src={whatsappQr} alt="Código QR para contactar por WhatsApp" />
      </a>
      <ContactForm />
    </section>
  );
}

export function Footer({ onCookieSettings }: { onCookieSettings?: () => void }) {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Pablo León Studio. Todos los derechos reservados.</span>
      <nav>
        <a href="/aviso-legal">Aviso legal</a>
        <a href="/politica-de-privacidad">Política de privacidad</a>
        <a href="/politica-de-cookies">Política de cookies</a>
        {onCookieSettings && (
          <button
            onClick={onCookieSettings}
            style={{ background: "none", border: 0, color: "inherit", cursor: "pointer", font: "inherit" }}
          >
            Configurar cookies
          </button>
        )}
        <a href="#inicio">Volver arriba ↑</a>
      </nav>
    </footer>
  );
}

export function LegalPage({ title, tag, children }: { title: string; tag: string; children: ReactNode }) {
  return (
    <div className="site">
      <Header name={tag} />
      <main className="legal">
        <p className="cap">{tag}</p>
        <h1>{title}</h1>
        {children}
      </main>
      <Footer />
    </div>
  );
}
