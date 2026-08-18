import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  at: string;
  version?: number;
};

// Una versión nueva fuerza el aviso tras las pruebas anteriores de esta web.
const KEY = "pl-cookie-consent-v6";

export function readConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as CookieConsent) : null;
    return parsed?.version === 6 ? parsed : null;
  } catch {
    return null;
  }
}

function saveConsent(c: CookieConsent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* almacenamiento no disponible */
  }
}

/**
 * Banner de consentimiento real: aceptar, rechazar o configurar.
 * Nada no esencial se activa hasta que hay consentimiento explícito.
 */
export default function CookieBanner({
  openSettings,
  onSettingsClosed,
}: {
  openSettings: boolean;
  onSettingsClosed: () => void;
}) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [config, setConfig] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    if (stored) {
      setAnalytics(stored.analytics);
      setMarketing(stored.marketing);
    }
  }, []);

  useEffect(() => {
    if (openSettings) setConfig(true);
  }, [openSettings]);

  const commit = (a: boolean, m: boolean) => {
    const next: CookieConsent = {
      necessary: true,
      analytics: a,
      marketing: m,
      at: new Date().toISOString(),
      version: 6,
    };
    saveConsent(next);
    setConsent(next);
    setConfig(false);
    onSettingsClosed();
  };

  if (typeof document === "undefined") return null;
  const showBanner = consent === null;
  if (!showBanner && !config) return null;

  if (config) {
    return (
      <div className="shade" role="dialog" aria-modal="true" aria-label="Configurar cookies">
        <div className="dialog">
          <button
            className="dialog-close"
            aria-label="Cerrar"
            onClick={() => {
              setConfig(false);
              onSettingsClosed();
            }}
          >
            ×
          </button>
          <p className="cap">PRIVACIDAD / COOKIES</p>
          <h2>Configura tus cookies</h2>
          <p>
            Elige qué cookies quieres permitir. Tu elección se guarda localmente en tu navegador y
            puedes cambiarla cuando quieras.
          </p>

          <div className="cookie-row">
            <input type="checkbox" checked disabled aria-label="Cookies necesarias" />
            <div>
              <strong>Necesarias (siempre activas)</strong>
              <p style={{ margin: 0 }}>
                Imprescindibles para que la web funcione y para recordar tu consentimiento.
              </p>
            </div>
          </div>

          <div className="cookie-row">
            <input
              id="ck-analytics"
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <div>
              <label htmlFor="ck-analytics">
                <strong>Analíticas</strong>
              </label>
              <p style={{ margin: 0 }}>
                Google Analytics mide de forma agregada el uso del sitio para mejorarlo. Permanece desactivado hasta que lo aceptas.
              </p>
            </div>
          </div>

          <div className="cookie-row">
            <input
              id="ck-marketing"
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <div>
              <label htmlFor="ck-marketing">
                <strong>Marketing</strong>
              </label>
              <p style={{ margin: 0 }}>
                Medición de campañas y contenido personalizado. Desactivadas por defecto.
              </p>
            </div>
          </div>

          <div className="cookie-actions" style={{ marginTop: 18 }}>
            <button className="btn-violet" onClick={() => commit(analytics, marketing)}>
              Guardar preferencias
            </button>
            <button className="btn-ghost" onClick={() => commit(false, false)}>
              Rechazar todo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return createPortal(
    <div className="cookie-bar" role="region" aria-label="Consentimiento de cookies">
      <p>
        Usamos cookies necesarias y, con tu permiso, Google Analytics para medir el uso de la web. Puedes aceptar o rechazar con la misma facilidad. Consulta la{" "}
        <a href="/politica-de-cookies/">política de cookies</a>.
      </p>
      <div className="cookie-actions">
        <button className="btn-violet" onClick={() => commit(true, true)}>
          Aceptar
        </button>
        <button className="btn-ghost" onClick={() => commit(false, false)}>
          Rechazar
        </button>
        <button className="btn-ghost" onClick={() => setConfig(true)}>
          Configurar
        </button>
      </div>
    </div>
    ,
    document.body,
  );
}
