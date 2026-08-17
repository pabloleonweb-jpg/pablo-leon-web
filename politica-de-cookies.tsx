import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "@/components/site/Chrome";
import { email } from "@/lib/site-content";

export const Route = createFileRoute("/politica-de-cookies")({
  head: () => ({ meta: [{ title: "Cookies — Pablo León Studio" }] }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalPage tag="COOKIES" title="Cookies">
      <p>
        pabloleonstudio.es utiliza almacenamiento local y cookies técnicas imprescindibles para recordar tu elección de consentimiento y permitir el funcionamiento básico del sitio. Las cookies analíticas o de marketing permanecen desactivadas hasta que las aceptes expresamente desde el aviso de cookies; puedes rechazarlo o cambiar tu elección en cualquier momento desde el enlace de configuración situado en el pie de página.
      </p>
      <p>
        Pablo León Studio, con domicilio de actividad en Murcia, España, no utiliza las cookies para vender datos personales. Si necesitas información adicional sobre el uso de cookies o sobre tu consentimiento, puedes contactar en <a href={`mailto:${email}`}>{email}</a> o en el 697 790 219.
      </p>
    </LegalPage>
  );
}
